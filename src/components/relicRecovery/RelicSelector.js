// @flow

import React, { Component } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";

type RelicPosition = "none" | "zone1" | "zone2" | "zone3";
type RelicOrientation = "na" | "down" | "upright";

export type RelicState = {
    position: ?RelicPosition,
    orientation: ?RelicOrientation,
}

type RelicProps = {
  state: RelicState,
  onChange: (RelicState) => void,
  disabled: boolean
};

class RelicSelector extends Component<RelicProps> {
    static defaultProps = {
        state: {
            position: null,
            orientation: null,
        },
    };

    setPosition = (position: RelicPosition) => {
        this.props.onChange({position, orientation: position === "none" ? "na" : null});
    };

    setOrientation = (orientation: RelicOrientation) => {
        this.props.onChange({position: this.props.state.position, orientation});
    };

    render() {
        const disableOrientation = this.props.disabled || !this.props.state.position || this.props.state.position === "none";
        return (
            <span>
                <ButtonGroup>
                    <Button disabled={this.props.disabled} active={this.props.state.position === "none"} onClick={() => this.setPosition("none")}>None</Button>
                    <Button disabled={this.props.disabled} active={this.props.state.position === "zone1"} onClick={() => this.setPosition("zone1")}>Zone 1</Button>
                    <Button disabled={this.props.disabled} active={this.props.state.position === "zone2"} onClick={() => this.setPosition("zone2")}>Zone 2</Button>
                    <Button disabled={this.props.disabled} active={this.props.state.position === "zone3"} onClick={() => this.setPosition("zone3")}>Zone 3</Button>
                </ButtonGroup>
                <ButtonGroup style={{'marginLeft': '0.5em'}}>
                    <Button
                        disabled={disableOrientation}
                        active={this.props.state.orientation === "down"}
                        onClick={() => this.setOrientation("down")}>
                        Down
                    </Button>
                    <Button
                        disabled={disableOrientation}
                        active={this.props.state.orientation === "upright"}
                        onClick={() => this.setOrientation("upright")}>
                        Upright
                    </Button>
                </ButtonGroup>
            </span>
        );
    }
}

export default RelicSelector;
