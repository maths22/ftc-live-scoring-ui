// @flow

import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import LandedRobotSelector from "./LandedRobotSelector";
import ParkedRobotSelector from "./ParkedRobotSelector";
import DepotsSelector from "./DepotsSelector";
import FieldsSampledSelector from "./FieldsSampledSelector";
import {AutoScore} from "../../data/RoverRuckusScore";

import {observer} from 'mobx-react';

type AutoProps = {
  state: AutoScore,
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
            <Col xs={6}>
              <div style={{'marginTop': '1em'}}>
                <span>Robot 1 Landed: </span>
                <LandedRobotSelector
                    onChange={(p) => this.props.state.set('robot1Landed', p)}
                    value={this.props.state.robot1Landed || undefined}
                    disabled={this.props.disabled}
                />
              </div>
              <div style={{'marginTop': '1em'}}>
                <span>Robot 1 Parked: </span>
                <ParkedRobotSelector
                    onChange={(p) => this.props.state.set('robot1Parked', p)}
                    value={this.props.state.robot1Parked || undefined}
                    disabled={this.props.disabled}
                />
              </div>
              <div style={{'marginTop': '1em'}}>
                <span>Field 1 Sampled: </span>
                <FieldsSampledSelector
                    onChange={(p) => this.props.state.set('field1Sampled', p)}
                    value={this.props.state.field1Sampled || undefined}
                    disabled={this.props.disabled}
                />
              </div>
            </Col>
            <Col xs={6}>
              <div style={{'marginTop': '1em'}}>
                <span>Robot 2 Landed: </span>
                <LandedRobotSelector
                    onChange={(p) => this.props.state.set('robot2Landed', p)}
                    value={this.props.state.robot2Landed || undefined}
                    disabled={this.props.disabled}
                />
              </div>
              <div style={{'marginTop': '1em'}}>
                <span>Robot 2 Parked: </span>
                <ParkedRobotSelector
                    onChange={(p) => this.props.state.set('robot2Parked', p)}
                    value={this.props.state.robot2Parked || undefined}
                    disabled={this.props.disabled}
                />
              </div>
              <div style={{'marginTop': '1em'}}>
                <span>Field 2 Sampled: </span>
                <FieldsSampledSelector
                    onChange={(p) => this.props.state.set('field2Sampled', p)}
                    value={this.props.state.field2Sampled || undefined}
                    disabled={this.props.disabled}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div style={{'marginTop': '1em'}}>
                <span>Markers placed: </span>
                <DepotsSelector
                    onChange={(p) => this.props.state.set('depotsClaimed', p)}
                    value={this.props.state.depotsClaimed || undefined}
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
