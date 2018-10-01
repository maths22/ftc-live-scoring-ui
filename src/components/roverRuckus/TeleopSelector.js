// @flow

import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";

import {observer} from "mobx-react";
import {TeleopScore} from "../../data/RoverRuckusScore";

type TeleopProps = {
  state: TeleopScore,
  disabled: boolean
};

@observer
class TeleopSelector extends Component<TeleopProps> {
  render() {
    //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
    return (
        <Grid fluid>
          <Row>
            <Col xs={4} style={{'marginTop': '1em'}}>
              <span>Depot Minerals: </span>
              <Counter
                  large
                  onChange={(p) => this.props.state.set('depotMinerals', p)}
                  value={this.props.state.depotMinerals}
                  disabled={this.props.disabled}
              />
            </Col>
            <Col xs={4} style={{'marginTop': '1em'}}>
              <span>Gold Cargo: </span>
              <Counter
                  large
                  onChange={(p) => this.props.state.set('goldCargo', p)}
                  value={this.props.state.goldCargo}
                  disabled={this.props.disabled}
              />
            </Col>
            <Col xs={4} style={{'marginTop': '1em'}}>
              <span>Silver Cargo: </span>
              <Counter
                  large
                  onChange={(p) => this.props.state.set('silverCargo', p)}
                  value={this.props.state.silverCargo}
                  disabled={this.props.disabled}
              />
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default TeleopSelector;
