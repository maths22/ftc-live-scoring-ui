// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import EndgameRobotSelector from "./EndgameRobotSelector";
import type {EndgamePosition} from "./EndgameRobotSelector";
import RelicSelector from "./RelicSelector";
import type {RelicState} from "./RelicSelector";

type EndgameState = {
    r1Pos: ?EndgamePosition,
    r2Pos: ?EndgamePosition,
    relic1State: RelicState,
    relic2State: RelicState,
};

type EndgameStateUpdate = {
    r1Pos?: ?EndgamePosition,
    r2Pos?: ?EndgamePosition,
    relic1State?: RelicState,
    relic2State?: RelicState,
};

type EndgameProps = {
    state: EndgameState,
    onChange: (EndgameState) => void,
};

class EndgameSelector extends Component<EndgameProps> {
    static defaultProps = {
        state: {
            r1Pos: null,
            r2Pos: null,
            relic1State: {
                position: null,
                orientation: null,
            },
            relic2State: {
                position: null,
                orientation: null,
            },
        },
    };

    updateProps = (newState : EndgameStateUpdate) => {
        const sendState : EndgameState = defaults({}, newState, this.props.state);
        this.props.onChange(sendState);
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={6} style={{'marginTop' : '1em'}}>
                        <span>Robot 1: </span>
                        <EndgameRobotSelector
                            onChange={(p) => this.updateProps({r1Pos: p})}
                            position={this.props.state.r1Pos}
                        />
                    </Col>
                    <Col sm={6} style={{'marginTop' : '1em'}}>
                        <span>Robot 2: </span>
                        <EndgameRobotSelector
                            onChange={(p) => this.updateProps({r2Pos: p})}
                            position={this.props.state.r2Pos}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 1: </span>
                        <RelicSelector
                            onChange={(p) => this.updateProps({relic1State: p})}
                            state={this.props.state.relic1State}
                        />
                    </Col>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 2: </span>
                        <RelicSelector
                            onChange={(p) => this.updateProps({relic2State: p})}
                            state={this.props.state.relic2State}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default EndgameSelector;
