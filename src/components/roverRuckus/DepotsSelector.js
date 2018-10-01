// @flow

import React, {Component} from 'react';
import {ButtonGroup, Button} from "react-bootstrap";

import type {DepotsClaimed} from '../../data/RoverRuckusScore'

type AutoRobotProps = {
  value: ?DepotsClaimed,
  onChange: (DepotsClaimed) => void,
  disabled: boolean
};

class DepotsSelector extends Component<AutoRobotProps> {
  static defaultProps = {
    value: null,
  };

  render() {
    return (
        <ButtonGroup className="btnGrpClass">
          <Button disabled={this.props.disabled} active={this.props.value === "zero"}
                  onClick={() => this.props.onChange("zero")}>Zero</Button>
          <Button disabled={this.props.disabled} active={this.props.value === "one"}
                  onClick={() => this.props.onChange("one")}>One</Button>
          <Button disabled={this.props.disabled} active={this.props.value === "two"}
                  onClick={() => this.props.onChange("two")}>Two</Button>
        </ButtonGroup>
    );
  }
}

export default DepotsSelector;
