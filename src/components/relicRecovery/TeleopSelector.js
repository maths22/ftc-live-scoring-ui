// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import CryptoboxSelector from "./CryptoboxSelector";
import type {CryptoboxState} from "./CryptoboxSelector";

type TeleopState = {
    cryptobox1State: ?CryptoboxState,
    cryptobox2State: ?CryptoboxState,
};

type TeleopStateUpdate = {
    cryptobox1State?: ?CryptoboxState,
    cryptobox2State?: ?CryptoboxState,
};

type TeleopProps = {
    state: TeleopState,
    onChange: (TeleopState) => void,
};

class TeleopSelector extends Component<TeleopProps> {
    static defaultProps = {
        state: {
            cryptobox1State: null,
            cryptobox2State: null,
        },
    };

    updateProps = (newState : TeleopStateUpdate) => {
        const sendState : TeleopState = defaults({}, newState, this.props.state);
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
                    </Col>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 2:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.updateProps({cryptobox2State: p})}
                            state={this.props.state.cryptobox2State || undefined}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default TeleopSelector;
