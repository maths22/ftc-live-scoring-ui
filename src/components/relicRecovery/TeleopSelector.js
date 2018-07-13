// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import CryptoboxSelector from "./CryptoboxSelector";

import { observer } from "mobx-react";
import {RRTeleopScore} from "../../data/RRScore";

type TeleopProps = {
    state: RRTeleopScore
};

@observer
class TeleopSelector extends Component<TeleopProps> {
    render() {
        //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
        return (
            <Grid fluid>
                <Row>
                    <Col xs={4} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 1:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.props.state.cryptobox1State = p}
                            state={this.props.state.cryptobox1State || undefined}
                        />
                    </Col>
                    <Col xs={4} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 2:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.props.state.cryptobox2State = p}
                            state={this.props.state.cryptobox2State || undefined}
                        />
                    </Col>
                    <Col xs={4} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 3:</span>
                        <CryptoboxSelector
                          onChange={(p) => this.props.state.cryptobox3State = p}
                          state={this.props.state.cryptobox3State || undefined}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default TeleopSelector;
