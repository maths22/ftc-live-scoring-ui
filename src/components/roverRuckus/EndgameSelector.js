// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import EndgameRobotSelector from "./EndgameRobotSelector";
import {EndgameScore} from "../../data/RoverRuckusScore";

import { observer } from 'mobx-react';

type EndgameProps = {
  state: EndgameScore,
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
                            onChange={(p) => this.props.state.set('robot1Position', p)}
                            position={this.props.state.robot1Position}
                            disabled={this.props.disabled}
                        />
                    </Col>
                    <Col sm={6} style={{'marginTop' : '1em'}}>
                        <span>Robot 2: </span>
                        <EndgameRobotSelector
                            onChange={(p) => this.props.state.set('robot2Position', p)}
                            position={this.props.state.robot2Position}
                            disabled={this.props.disabled}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default EndgameSelector;
