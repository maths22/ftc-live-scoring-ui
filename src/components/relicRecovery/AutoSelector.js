// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import AutoRobotSelector from "./AutoRobotSelector";
import type {AutoPosition} from "./AutoRobotSelector";
import AutoJewelSelector from "./AutoJewelSelector";
import type {Color} from "./AutoJewelSelector";
import CryptoboxSelector from "./CryptoboxSelector";
import type {CryptoboxState} from "./CryptoboxSelector";

type AutoState = {
    r1Pos: ?AutoPosition,
    r2Pos: ?AutoPosition,
    jewel1Remaining: ?Color,
    jewel2Remaining: ?Color,
    cryptobox1State: ?CryptoboxState,
    cryptobox2State: ?CryptoboxState,
};

type AutoStateUpdate = {
    r1Pos?: ?AutoPosition,
    r2Pos?: ?AutoPosition,
    jewel1Remaining?: ?Color,
    jewel2Remaining?: ?Color,
    cryptobox1State?: ?CryptoboxState,
    cryptobox2State?: ?CryptoboxState,
};

type AutoProps = {
    state: AutoState,
    onChange: (AutoState) => void,
};

class AutoSelector extends Component<AutoProps> {
    static defaultProps = {
        state: {
            r1Pos: null,
            r2Pos: null,
            jewel1Remaining: null,
            jewel2Remaining: null,
            cryptobox1State: null,
            cryptobox2State: null,
        },
    };

    updateProps = (newState : AutoStateUpdate) => {
        const sendState : AutoState = defaults({}, newState, this.props.state);
        this.props.onChange(sendState);
    };

    render() {
        //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
        return (
            <Grid>
                <Row>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 1:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.updateProps({cryptobox1State: p})}
                            state={this.props.state.cryptobox1State || undefined}
                        />
                        <div style={{'marginTop' : '1em'}}>
                            <span>Jewel Holder 1: </span>
                            <AutoJewelSelector
                                onChange={(p) => this.updateProps({jewel1Remaining: p})}
                                color={this.props.state.jewel1Remaining || undefined}
                            />
                        </div>
                        <div style={{'marginTop' : '1em'}}>
                            <span>Robot 1: </span>
                            <AutoRobotSelector
                                onChange={(p) => this.updateProps({r1Pos: p})}
                                position={this.props.state.r1Pos || undefined}
                            />
                        </div>
                    </Col>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 2:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.updateProps({cryptobox2State: p})}
                            state={this.props.state.cryptobox2State || undefined}
                        />
                        <div style={{'marginTop' : '1em'}}>
                            <span>Jewel Holder 2: </span>
                            <AutoJewelSelector
                                onChange={(p) => this.updateProps({jewel2Remaining: p})}
                                color={this.props.state.jewel2Remaining || undefined}
                            />
                        </div>
                        <div style={{'marginTop' : '1em'}}>
                            <span>Robot 2: </span>
                            <AutoRobotSelector
                                onChange={(p) => this.updateProps({r2Pos: p})}
                                position={this.props.state.r2Pos || undefined}
                            />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AutoSelector;
