// @flow

import React, { Component } from 'react';
import {Grid, Row, Col, Button, ButtonGroup} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";
import RandomizationResults from "./RandomizationResults";

type JewelPosition = "left" | "right";
type Pictograph = "left" | "center" | "right";
type RandomizationState = {
    jewelPosition: JewelPosition,
    pictograph: Pictograph,
    dieRoll: number,
};

type RandomizationProps = {
    state: ?RandomizationState,
    onChange: (RandomizationState) => void,
};

const pictographs = ["left", "center", "right"];
const jewelPositions= ["left", "right"];

//Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class RandomizationSelector extends Component<RandomizationProps> {
    static defaultProps = {
        state: null,
    };

    onChange = (val: number) => {
        this.props.onChange({
            dieRoll: val,
            pictograph: pictographs[(val - 1) % 3],
            jewelPosition: jewelPositions[Math.floor((val - 1) / 3)],
        })
    };

    generateRandom = () => {
        this.onChange(getRandomInt(1, 7));
    };

    render() {
        return (
            <div>
                <ButtonGroup className="btnGrpClass">
                    <Button active={this.props.state && this.props.state.dieRoll === 1} onClick={() => this.onChange(1)}>1</Button>
                    <Button active={this.props.state && this.props.state.dieRoll === 2} onClick={() => this.onChange(2)}>2</Button>
                    <Button active={this.props.state && this.props.state.dieRoll === 3} onClick={() => this.onChange(3)}>3</Button>
                    <Button active={this.props.state && this.props.state.dieRoll === 4} onClick={() => this.onChange(4)}>4</Button>
                    <Button active={this.props.state && this.props.state.dieRoll === 5} onClick={() => this.onChange(5)}>5</Button>
                    <Button active={this.props.state && this.props.state.dieRoll === 6} onClick={() => this.onChange(6)}>6</Button>
                </ButtonGroup><br/>
                <Button onClick={() => this.generateRandom()}>Randomize</Button>
                {this.props.state ?
                    <RandomizationResults number={this.props.state.dieRoll}/>
                    : ''}
            </div>
        );
    }
}

export default RandomizationSelector;
