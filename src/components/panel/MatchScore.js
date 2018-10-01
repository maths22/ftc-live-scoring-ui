// @flow

import React, { Component } from 'react';
import {Grid, Row, Col, Tabs, TabPane, Tab} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";
import AutoSelector from "../roverRuckus/AutoSelector";
import TeleopSelector from "../roverRuckus/TeleopSelector";
import EndgameSelector from "../roverRuckus/EndgameSelector";
import PenaltySelector from "../referee/PenaltySelector";
import TeamInfo from "../referee/TeamInfo";

import {observer} from 'mobx-react'

type MatchScoreProps = {
  state: Match,
  displayTeamInfo: boolean,
  unsubmittedReadOnly: boolean,
  hideAuto: boolean,
  hideTeleop: boolean,
  alliance: "red" | "blue",
};

@observer
class MatchScore extends Component<MatchScoreProps> {

  render() {
    const score = this.props.alliance === "blue" ? this.props.state.blueScore : this.props.state.redScore;
    const alliance = this.props.alliance === "blue" ? this.props.state.blueAlliance : this.props.state.redAlliance;

    const shouldDisableTeleop = !score.autoSubmitted;
    const keyCol = (this.props.state.random - 1) % 3;

    //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
    return (
      <div>

        <h3>{this.props.alliance.replace(/^\w/, c => c.toUpperCase())} Alliance</h3>
        <Tabs>
          { this.props.hideAuto ? null : <Tab eventKey={1} title={"Auto"}>
            <AutoSelector state={score.auto} disabled={this.props.unsubmittedReadOnly && !score.autoSubmitted} keyCol={keyCol}/>
          </Tab> }
          { this.props.hideTeleop ? null : <Tab eventKey={2} title={"Teleop"} disabled={shouldDisableTeleop}>
            <TeleopSelector state={score.teleop} disabled={this.props.unsubmittedReadOnly && !score.submitted} />
            <EndgameSelector state={score.endgame} disabled={this.props.unsubmittedReadOnly && !score.submitted} />
          </Tab> }
          { this.props.hideAuto && this.props.hideTeleop ? <Tab eventKey={3}>
            Match complete
          </Tab> : null}
        </Tabs>
        <hr/>
        { this.props.displayTeamInfo ? <PenaltySelector state={score.penalties} /> : null }

        {this.props.displayTeamInfo ? this.renderTeams(alliance) : null}
      </div>
    );
  }

  renderTeams = (alliance) => {
    // var partcipatingTeams = alliance.filter((t : Team) => t.participating);
    // if(partcipatingTeams.length < 2) {
    //   //TODO do it this way
    // } else {
    //   return partcipatingTeams.map((t, idx) => <TeamInfo key={idx} state={t} />)
    // }
    return alliance.map((t, idx) => <TeamInfo key={idx} state={t} showPresent={alliance.length > 2} />)
  }


}

export default MatchScore;
