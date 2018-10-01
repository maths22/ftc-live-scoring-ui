// @flow

import React, {Component} from 'react';
import {ButtonGroup, Button} from "react-bootstrap";

import type {ParkedState} from '../../data/RoverRuckusScore'

type AutoRobotProps = {
  value: ?ParkedState,
  onChange: (ParkedState) => void,
  disabled: boolean
};

class ParkedRobotSelector extends Component<AutoRobotProps> {
  static defaultProps = {
    value: null,
  };

  render() {
    return (
        <ButtonGroup className="btnGrpClass">
          <Button disabled={this.props.disabled} active={this.props.value === "not_parked"}
                  onClick={() => this.props.onChange("not_parked")}>Not Parked</Button>
          <Button disabled={this.props.disabled} active={this.props.value === "parked"}
                  onClick={() => this.props.onChange("parked")}>Parked</Button>
        </ButtonGroup>
    );
  }
}

export default ParkedRobotSelector;
