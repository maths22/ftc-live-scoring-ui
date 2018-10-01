// @flow

import React, {Component} from 'react';
import {ButtonGroup, Button} from "react-bootstrap";

import type {LandedState} from '../../data/RoverRuckusScore'

type AutoRobotProps = {
  value: ?LandedState,
  onChange: (LandedState) => void,
  disabled: boolean
};

class LandedRobotSelector extends Component<AutoRobotProps> {
  static defaultProps = {
    value: null,
  };

  render() {
    return (
        <ButtonGroup className="btnGrpClass">
          <Button disabled={this.props.disabled} active={this.props.value === "not_landed"}
                  onClick={() => this.props.onChange("not_landed")}>Not Landed</Button>
          <Button disabled={this.props.disabled} active={this.props.value === "landed"}
                  onClick={() => this.props.onChange("landed")}>Landed</Button>
        </ButtonGroup>
    );
  }
}

export default LandedRobotSelector;
