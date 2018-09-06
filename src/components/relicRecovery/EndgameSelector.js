// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import EndgameRobotSelector from "./EndgameRobotSelector";
import RelicSelector from "./RelicSelector";
import {RREndgameScore} from "../../data/RRScore";

import { observer } from 'mobx-react';

type EndgameProps = {
  state: RREndgameScore,
  disabled:boolean,
};

@observer
class EndgameSelector extends Component<EndgameProps> {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={6} style={{'marginTop' : '1em'}}>
                        <span>Robot 1: </span>
                        <EndgameRobotSelector
                            onChange={(p) => this.props.state.set('r1Pos', p)}
                            position={this.props.state.r1Pos}
                            disabled={this.props.disabled}
                        />
                    </Col>
                    <Col sm={6} style={{'marginTop' : '1em'}}>
                        <span>Robot 2: </span>
                        <EndgameRobotSelector
                            onChange={(p) => this.props.state.set('r2Pos', p)}
                            position={this.props.state.r2Pos}
                            disabled={this.props.disabled}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 1: </span>
                        <RelicSelector
                            onChange={(p) => this.props.state.set('relic1State', p)}
                            state={this.props.state.relic1State}
                            disabled={this.props.disabled}
                        />
                    </Col>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 2: </span>
                        <RelicSelector
                            onChange={(p) => this.props.state.set('relic2State', p)}
                            state={this.props.state.relic2State}
                            disabled={this.props.disabled}
                        />
                    </Col>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 3: </span>
                        <RelicSelector
                          onChange={(p) => this.props.state.set('relic3State', p)}
                          state={this.props.state.relic3State}
                          disabled={this.props.disabled}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default EndgameSelector;
