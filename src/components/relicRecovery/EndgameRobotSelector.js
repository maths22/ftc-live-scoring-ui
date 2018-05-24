// @flow

import React, { Component } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";

export type EndgamePosition = "balanced" | "unbalanced";

type EndgameRobotProps = {
    position: ?EndgamePosition,
    onChange: (EndgamePosition) => void,
};

class EndgameRobotSelector extends Component<EndgameRobotProps> {
    static defaultProps = {
        position: null,
    };

    render() {
        return (
            <ButtonGroup className="btnGrpClass">
                <Button active={this.props.position === "unbalanced"} onClick={() => this.props.onChange("unbalanced")}>Not Balanced</Button>
                <Button active={this.props.position === "balanced"} onClick={() => this.props.onChange("balanced")}>Balanced</Button>
            </ButtonGroup>
        );
    }
}

export default EndgameRobotSelector;
