// @flow

import React, { Component } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";

export type Color = "red" | "blue" | "both" | "none";

type AutoJewelProps = {
  //TODO consider order?
  color: ?Color,
  onChange: (Color) => void,
  disabled: true
};

class AutoJewelSelector extends Component<AutoJewelProps> {
    static defaultProps = {
        color: null,
    };

    render() {

        //TODO color the buttons
        return (
            <ButtonGroup className="btnGrpClass">
                <Button disabled={this.props.disabled} active={this.props.color === "red"} onClick={() => this.props.onChange("red")}>Red</Button>
                <Button disabled={this.props.disabled} active={this.props.color === "blue"} onClick={() => this.props.onChange("blue")}>Blue</Button>
                <Button disabled={this.props.disabled} active={this.props.color === "both"} onClick={() => this.props.onChange("both")}>Both</Button>
                <Button disabled={this.props.disabled} active={this.props.color === "none"} onClick={() => this.props.onChange("none")}>None</Button>
            </ButtonGroup>
        );
    }
}

export default AutoJewelSelector;
