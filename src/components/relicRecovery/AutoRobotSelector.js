// @flow

import React, { Component } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";

export type AutoPosition = "safe" | "notsafe";

type AutoRobotProps = {
  position: ?AutoPosition,
  onChange: (AutoPosition) => void,
  disabled: boolean
};

class AutoRobotSelector extends Component<AutoRobotProps> {
    static defaultProps = {
        position: null,
    };

    render() {
        return (
            <ButtonGroup className="btnGrpClass" >
                <Button disabled={this.props.disabled} active={this.props.position === "notsafe"} onClick={() => this.props.onChange("notsafe")}>Not Safe</Button>
                <Button disabled={this.props.disabled} active={this.props.position === "safe"} onClick={() => this.props.onChange("safe")}>Safe</Button>
            </ButtonGroup>
        );
    }
}

export default AutoRobotSelector;
