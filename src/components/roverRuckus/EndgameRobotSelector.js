// @flow

import React, { Component } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";

import type { RobotEndgamePos } from '../../data/RoverRuckusScore';

type EndgameRobotProps = {
  position: ?RobotEndgamePos,
  onChange: (RobotEndgamePos) => void,
  disabled: boolean
};

class EndgameRobotSelector extends Component<EndgameRobotProps> {
    static defaultProps = {
        position: null,
    };

    render() {
        return (
            <ButtonGroup className="btnGrpClass">
              <Button disabled={this.props.disabled} active={this.props.position === "none"} onClick={() => this.props.onChange("none")}>None</Button>
              <Button disabled={this.props.disabled} active={this.props.position === "parked"} onClick={() => this.props.onChange("parked")}>Parked</Button>
              <Button disabled={this.props.disabled} active={this.props.position === "parked_completely"} onClick={() => this.props.onChange("parked_completely")}>Parked Completely In</Button>
              <Button disabled={this.props.disabled} active={this.props.position === "latched"} onClick={() => this.props.onChange("latched")}>Latched</Button>
            </ButtonGroup>
        );
    }
}

export default EndgameRobotSelector;
