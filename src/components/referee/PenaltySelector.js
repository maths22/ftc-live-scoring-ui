// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";
import {PenaltyScore} from "../../data/RRScore";

import { observer } from "mobx-react";

type PenaltyProps = {
    state: PenaltyScore,
};

@observer
class PenaltySelector extends Component<PenaltyProps> {
    render() {
        //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
        return (
            <Grid fluid>
                <Row>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Minor: </span>
                        <Counter
                            onChange={(p) => this.props.state.set('minor', p)}
                            value={this.props.state.minor}
                        />
                    </Col>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Major: </span>
                        <Counter
                            onChange={(p) => this.props.state.set('major', p)}
                            value={this.props.state.majort}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default PenaltySelector;
