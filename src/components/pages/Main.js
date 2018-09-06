// @flow

import React, { Component } from 'react';
import {ButtonGroup, Button, Panel, Alert, FormControl, Grid, Row, Col} from "react-bootstrap";
import {defaults} from "lodash";
import type {GlobalPanelsConfig} from "../../data/Config";
import {PanelConfig} from "../../data/Config";
import ConfigPanel from "../panel/Config";

import {observer} from 'mobx-react';
import {Link, Redirect} from "react-router-dom";
import Api from "../../api";
import {State} from "../../data/State";
import MatchScore from "../panel/MatchScore";
import RandomizationSelector from "../relicRecovery/RandomizationSelector";
import RandomizationResults from "../relicRecovery/RandomizationResults";

type ConfigProps = {
  globalConfig: GlobalPanelsConfig,
  panelConfig: PanelConfig,
  state: State,
};

@observer
class Config extends Component<ConfigProps> {
  api: Api = new Api();

  containsNull (obj) {
    for (const key in obj) {
      if(obj[key] === null) return true;
      else if(typeof obj[key] === 'object') {
        if(this.containsNull(obj[key])) return true;
      }
    }
    return false;
  }

  isMaster = () => {
    const tabletCount = this.props.globalConfig.tabletCount;
    const role = this.props.panelConfig.role;
    return !((tabletCount === 2 && role !== 'red') || (tabletCount === 3 && role !== 'ref'));
  };

  renderSelect = () => {
    if(!this.isMaster()) return <h3>{this.props.state.currentMatch.number}</h3>;
    return <FormControl componentClass="select" placeholder="select" value={this.props.state.currentMatch.number} onChange={(a) => this.props.state.selectMatch(this.props.panelConfig.field, a.target.value)}>
      <option value="">Select a match...</option>
      {this.props.state.matches.map((m) => <option>{m}</option>)}
    </FormControl>
  };

  renderSubmit = () => {
    const tabletCount = this.props.globalConfig.tabletCount;
    const role = this.props.panelConfig.role;
    const match = this.props.state.currentMatch;
    let buttonText = "Submit";
    let disable = false;
    let autoOnly = false;
    if(!match) {
      disable = true;
    } else {
      if(tabletCount === 3 && role === 'ref') {
        buttonText = "Finalize";
        disable = !(match.redScore.autoSubmitted && match.redScore.submitted && match.blueScore.autoSubmitted && match.blueScore.submitted);
      } else if(tabletCount === 3 || tabletCount === 2) {
        const score = role === 'red' ? match.redScore : match.blueScore;
        if(!score.autoSubmitted) {
          autoOnly = true;
          buttonText = "Submit Auto";
        }
      } else if (tabletCount === 1 && role === 'ref') {
        buttonText = "Finalize";
        const needAuto = !(match.redScore.autoSubmitted && match.blueScore.autoSubmitted);
        if(needAuto) {
          autoOnly = true;
        }
      }
    }
    if(autoOnly) {
      buttonText = "Submit Auto";
      if(role === "ref" || role === "red") {
        disable = disable || this.containsNull(match.redScore.auto);
      }
      if(role === "ref" || role === "blue") {
        disable = disable || this.containsNull(match.blueScore.auto);
      }
    } else {
      if(role === "ref" || role === "red") {
        disable = disable || this.containsNull(match.redScore);
      }
      if(role === "ref" || role === "blue") {
        disable = disable || this.containsNull(match.blueScore);
      }
      if(role === 'ref' || (role === "red" && tabletCount < 3)) {
        //TODO fix
        // disable = disable || match.redAlliance.filter((t) => t.participating).length !== 2
      }
      if(role === 'ref' || (role === "blue" && tabletCount < 3)) {
        // disable = disable || match.blueAlliance.filter((t) => t.participating).length !== 2
      }
    }


    return <Button style={{float: "right"}} onClick={() => this.doSubmit()} bsStyle="primary" disabled={disable}>{buttonText}</Button>;
  };


  doSubmit = () => {
    const tabletCount = this.props.globalConfig.tabletCount;
    const role = this.props.panelConfig.role;
    const match = this.props.state.currentMatch;

    const submit = {
      redAuto: false,
      blueAuto: false,
      red: false,
      blue: false,
      finalize:false
    };
    if(role === 'ref' || role === 'red') {
      submit.redAuto = true;
    }
    if(role === 'ref' || role === 'blue') {
      submit.blueAuto = true;
    }

    if(!match.redScore.autoSubmitted && (role === 'ref' || role === 'red')) {
      match.redScore.teleop.set('cryptobox1State', match.redScore.auto.cryptobox1State);
      match.redScore.teleop.set('cryptobox2State', match.redScore.auto.cryptobox2State);
      match.redScore.teleop.set('cryptobox3State', match.redScore.auto.cryptobox3State);
    }

    if(!match.blueScore.autoSubmitted && (role === 'ref' || role === 'blue')) {
      match.blueScore.teleop.set('cryptobox1State', match.blueScore.auto.cryptobox1State);
      match.blueScore.teleop.set('cryptobox2State', match.blueScore.auto.cryptobox2State);
      match.blueScore.teleop.set('cryptobox3State', match.blueScore.auto.cryptobox3State);
    }

    if((role === 'ref' || role === 'red') && match.redScore.autoSubmitted) {
      submit.red = true;
    }
    if((role === 'ref' || role === 'blue') && match.blueScore.autoSubmitted) {
      submit.blue = true;
    }

    if(role === 'ref' && match.redScore.autoSubmitted && match.blueScore.autoSubmitted) {
      submit.finalize = true;
    }
    if(tabletCount === 2 && (role === 'red' && match.redScore.autoSubmitted)) {
      submit.finalize = true;
    }
    if(tabletCount === 2 && (role === 'blue' && match.blueScore.autoSubmitted)) {
      submit.finalize = true;
    }

    //TODO this is def wrong

    if(submit.finalize && match.redScore.finalized && match.blueScore.finalized) {
      const cont = window.confirm("Are you sure you want to resubmit the match?");
      if(!cont) {
        return
      }
    }
      //TODO this is slightly wrong
    match.redScore.autoSubmitted = submit.redAuto;
    match.redScore.submitted = submit.red;
    match.blueScore.autoSubmitted = submit.blueAuto;
    match.blueScore.submitted = submit.blue;
    match.redScore.finalized = submit.finalize;
    match.blueScore.finalized = submit.finalize;

    this.api.submit(match.number, submit);
  };

  reset() {
    const cont = window.confirm(`Are you sure you want to reset the results for ${this.props.state.currentMatch.number}?`);
    if(cont) {
      this.api.resetMatch(this.props.state.currentMatch.number);
      window.location.reload(false);
    }
  }

  renderMatch = () => {
    if(this.props.state.currentMatch.started) {
      if(this.props.panelConfig.role === 'ref') {
        return <Grid fluid>
          <Row>
            <Col xs={6}>
              <MatchScore state={this.props.state.currentMatch} displayTeamInfo={true} hideAuto={false} hideTeleop={false} unsubmittedReadOnly={this.props.globalConfig.tabletCount === 3} alliance={"red"}/>
            </Col>
            <Col xs={6}>
              <MatchScore state={this.props.state.currentMatch} displayTeamInfo={true} hideAuto={false} hideTeleop={false} unsubmittedReadOnly={this.props.globalConfig.tabletCount === 3} alliance={"blue"}/>
            </Col>
          </Row>
        </Grid>
      } else {
        const score = this.props.panelConfig.role === 'red' ? this.props.state.currentMatch.redScore : this.props.state.currentMatch.blueScore;
        const hideAuto = this.props.globalConfig.tabletCount === 3 && score.autoSubmitted;
        const hideTeleop = this.props.globalConfig.tabletCount === 3 && score.submitted;

        return hideAuto && hideTeleop ? <span>Match complete</span>
            : <MatchScore state={this.props.state.currentMatch} displayTeamInfo={this.props.globalConfig.tabletCount < 3} hideAuto={hideAuto} hideTeleop={hideTeleop} unsubmittedReadOnly={false} alliance={this.props.panelConfig.role}/>
      }
    } else {
      if(this.isMaster()) {
        return [
            <RandomizationSelector number={this.props.state.currentMatch.random} onChange={(n) => this.props.state.currentMatch.setRandom(n)}/>,
            this.props.state.currentMatch.random ?
                <div><br/><Button onClick={() => this.props.state.currentMatch.startMatch()}>Start</Button> (Note this does not control the timer)</div>
                : null
            ]
      } else {
        return <RandomizationResults number={this.props.state.currentMatch.random}/>
      }
    }

  };


  render() {
    if(!this.props.panelConfig.field || !this.props.panelConfig.role) {
      return <Redirect to="/config" />
    }

    return <div className="container">
      <Link to="/config">Config</Link>
      <Grid fluid>
        <Row>
          <Col xs={6}>
            {this.renderSelect()}
          </Col>
          { this.props.state.currentMatch ? <Col xs={6}>
            <Button onClick={() => this.reset()}>Reset</Button>
            <span>Randomization result: {this.props.state.currentMatch.random ? this.props.state.currentMatch.random : "pending"}</span>
            {this.renderSubmit()}
          </Col> : null}
        </Row>
      </Grid>

      <div>
      {this.props.state.currentMatch ?
          this.renderMatch()
          :
          "Select a match"
      }
      </div>
    </div>;
  }

}

export default Config;
