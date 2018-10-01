// @flow

import React, {Component} from 'react';
import {ButtonGroup, Button} from "react-bootstrap";

import type {MineralsState} from '../../data/RoverRuckusScore'

type AutoRobotProps = {
  value: ?MineralsState,
  onChange: (MineralsState) => void,
  disabled: boolean
};

class FieldsSampledSelector extends Component<AutoRobotProps> {
  static defaultProps = {
    value: null,
  };

  render() {
    return (
        <ButtonGroup className="btnGrpClass">
          <Button disabled={this.props.disabled} active={this.props.value === "not_sampled"}
                  onClick={() => this.props.onChange("not_sampled")}>Not Sampled</Button>
          <Button disabled={this.props.disabled} active={this.props.value === "sampled"}
                  onClick={() => this.props.onChange("sampled")}>Sampled</Button>
        </ButtonGroup>
    );
  }
}

export default FieldsSampledSelector;
