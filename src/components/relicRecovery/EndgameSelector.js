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
                            onChange={(p) => this.props.state.r1Pos = p}
                            position={this.props.state.r1Pos}
                        />
                    </Col>
                    <Col sm={6} style={{'marginTop' : '1em'}}>
                        <span>Robot 2: </span>
                        <EndgameRobotSelector
                            onChange={(p) => this.props.state.r2Pos = p}
                            position={this.props.state.r2Pos}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 1: </span>
                        <RelicSelector
                            onChange={(p) => this.props.state.relic1State = p}
                            state={this.props.state.relic1State}
                        />
                    </Col>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 2: </span>
                        <RelicSelector
                            onChange={(p) => this.props.state.relic2State = p}
                            state={this.props.state.relic2State}
                        />
                    </Col>
                    <Col md={12} style={{'marginTop' : '1em'}}>
                        <span>Relic 3: </span>
                        <RelicSelector
                          onChange={(p) => this.props.state.relic3State = p}
                          state={this.props.state.relic3State}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default EndgameSelector;
