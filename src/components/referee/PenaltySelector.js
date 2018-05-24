// @flow

import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";

type PenaltyState = {
    minorPenalties: number,
    majorPenalties: number,
};

type PenaltyStateUpdate = {
    minorPenalties?: number,
    majorPenalties?: number,
};

type PenaltyProps = {
    state: PenaltyState,
    onChange: (PenaltyState) => void,
};

class PenaltySelector extends Component<PenaltyProps> {
    static defaultProps = {
        state: {
            minorPenalties: 0,
            majorPenalties: 0,
        },
    };

    updateProps = (newState : PenaltyStateUpdate) => {
        const sendState : PenaltyState = defaults({}, newState, this.props.state);
        this.props.onChange(sendState);
    };

    render() {
        //TODO i need a breakpoint so 600 is 2 col but smaller is 1 col
        return (
            <Grid>
                <Row>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Minor: </span>
                        <Counter
                            onChange={(p) => this.updateProps({minorPenalties: p})}
                            value={this.props.state.minorPenalties}
                        />
                    </Col>
                    <Col xs={6} style={{'marginTop' : '1em'}}>
                        <span>Major: </span>
                        <Counter
                            onChange={(p) => this.updateProps({majorPenalties: p})}
                            value={this.props.state.majorPenalties}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default PenaltySelector;
