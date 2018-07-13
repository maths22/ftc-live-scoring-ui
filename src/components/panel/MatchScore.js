// @flow

import React, { Component } from 'react';
import {Grid, Row, Col, Tabs, TabPane, Tab} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";
import type {Alliance, Match} from "../../types/Match";
import type {ConfigState} from "../../modules/config";
import AutoSelector from "../relicRecovery/AutoSelector";
import type {RRAutoScore} from "../../types/RRScore";
import TeleopSelector from "../relicRecovery/TeleopSelector";
import EndgameSelector from "../relicRecovery/EndgameSelector";
import PenaltySelector from "../referee/PenaltySelector";
import TeamInfo from "../referee/TeamInfo";

import {observer} from 'mobx-react'

type MatchScoreProps = {
  state: Match,
  displayTeamInfo: boolean,
  unsubmittedReadOnly: boolean,
  alliance: "red" | "blue",
};

@observer
class MatchScore extends Component<MatchScoreProps> {

  render() {
    const score = this.props.alliance === "blue" ? this.props.state.blueScore : this.props.state.redScore;
    const alliance = this.props.alliance === "blue" ? this.props.state.blueAlliance : this.props.state.redAlliance;

    const shouldDisableTeleop = !score.autoSubmitted;

    //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
    return (
      <div>

        <h3>{this.props.alliance.replace(/^\w/, c => c.toUpperCase())} Alliance</h3>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title={"Auto"}>
            <AutoSelector state={score.auto} />
          </Tab>
          <Tab eventKey={2} title={"Teleop"} disabled={shouldDisableTeleop}>
            <TeleopSelector state={score.teleop} />
            <EndgameSelector state={score.endgame} />
          </Tab>
        </Tabs>
        <hr/>
        <PenaltySelector state={score.penalties} />

        {this.renderTeams(alliance)}
      </div>
    );
  }

  renderTeams = (alliance) => {
    var partcipatingTeams = alliance.filter((t : Team) => t.participating);
    if(partcipatingTeams.length < 2) {
      //TODO
    } else {
      return partcipatingTeams.map((t, idx) => <TeamInfo key={idx} state={t} />)
    }

  }


}

export default MatchScore;
