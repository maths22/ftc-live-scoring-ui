// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import AutoRobotSelector from "./AutoRobotSelector";
import AutoJewelSelector from "./AutoJewelSelector";
import CryptoboxSelector from "./CryptoboxSelector";
import {RRAutoScore} from "../../data/RRScore";

import { observer } from 'mobx-react';

type AutoProps = {
  state: RRAutoScore,
  disabled: boolean,
  keyCol: number
};

@observer
class AutoSelector extends Component<AutoProps> {
    render() {
        //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
        return (
            <Grid fluid>
                <Row>
                    <Col xs={4} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 1:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.props.state.set('cryptobox1State', p)}
                            onSetKey={(p) => this.props.state.set('cryptobox1Key', p)}
                            keyCol={this.props.keyCol}
                            keySelected={this.props.state.cryptobox1Key}
                            state={this.props.state.cryptobox1State || undefined}
                            disabled={this.props.disabled}
                        />

                    </Col>
                    <Col xs={4} style={{'marginTop' : '1em'}}>
                        <span>Cryptobox 2:</span>
                        <CryptoboxSelector
                            onChange={(p) => this.props.state.set('cryptobox2State', p)}
                            onSetKey={(p) => this.props.state.set('cryptobox2Key', p)}
                            keyCol={this.props.keyCol}
                            keySelected={this.props.state.cryptobox2Key}
                            state={this.props.state.cryptobox2State || undefined}
                            disabled={this.props.disabled}
                        />
                    </Col>
                  <Col xs={4} style={{'marginTop' : '1em'}}>
                    <span>Cryptobox 3:</span>
                    <CryptoboxSelector
                      onChange={(p) => this.props.state.set('cryptobox3State', p)}
                      onSetKey={(p) => this.props.state.set('cryptobox3Key', p)}
                      keyCol={this.props.keyCol}
                      keySelected={this.props.state.cryptobox3Key}
                      state={this.props.state.cryptobox3State || undefined}
                      disabled={this.props.disabled}
                    />
                  </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                      <div style={{'marginTop' : '1em'}}>
                        <span>Jewel Holder 1: </span>
                        <AutoJewelSelector
                          onChange={(p) => this.props.state.set('jewel1Remaining', p)}
                          color={this.props.state.jewel1Remaining || undefined}
                          disabled={this.props.disabled}
                        />
                      </div>
                      <div style={{'marginTop' : '1em'}}>
                        <span>Robot 1: </span>
                        <AutoRobotSelector
                          onChange={(p) => this.props.state.set('r1Pos', p)}
                          position={this.props.state.r1Pos || undefined}
                          disabled={this.props.disabled}
                        />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div style={{'marginTop' : '1em'}}>
                        <span>Jewel Holder 2: </span>
                        <AutoJewelSelector
                          onChange={(p) => this.props.state.set('jewel2Remaining', p)}
                          color={this.props.state.jewel2Remaining || undefined}
                          disabled={this.props.disabled}
                        />
                      </div>
                      <div style={{'marginTop' : '1em'}}>
                        <span>Robot 2: </span>
                        <AutoRobotSelector
                          onChange={(p) => this.props.state.set('r2Pos', p)}
                          position={this.props.state.r2Pos || undefined}
                          disabled={this.props.disabled}
                        />
                      </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AutoSelector;
