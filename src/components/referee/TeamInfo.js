// @flow

import React, { Component } from 'react';
import {Grid, Row, Col, Checkbox} from "react-bootstrap";
import defaults from "lodash/defaults";
import {Team} from "../../data/Match";

import {observer} from 'mobx-react'

type TeamProps = {
  state: Team,
};

@observer
class TeamInfo extends Component<TeamProps> {

  render() {
    //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
    return (
      <Grid fluid>
        <Row>
          <Col xs={5} style={{'marginTop' : '1em'}}>
            <span>{this.props.state.number}</span>
          </Col>
          <Col xs={3} style={{'marginTop' : '1em'}}>
            <Checkbox
              onChange={(p) => {this.props.state.noShow = p.target.checked}}
              checked={this.props.state.noShow}
              inline
            >No show</Checkbox>
          </Col>
          <Col xs={2} style={{'marginTop' : '1em'}}>
            <Checkbox
              onChange={(p) => this.props.state.yellowCard = p.target.checked}
              checked={this.props.state.yellowCard}
              inline
            >Yellow</Checkbox>
          </Col>
          <Col xs={2} style={{'marginTop' : '1em'}}>
            <Checkbox
              onChange={(p) => this.props.state.redCard = p.target.checked}
              checked={this.props.state.redCard}
              inline
            >Red</Checkbox>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TeamInfo;
