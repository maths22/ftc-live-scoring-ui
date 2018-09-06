// @flow

import React, { Component } from 'react';
import {Grid, Row, Col, Button, ButtonGroup} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";
import RandomizationResults from "./RandomizationResults";

type RandomizationProps = {
    number: number,
    onChange: (number) => void,
};


//Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class RandomizationSelector extends Component<RandomizationProps> {

    generateRandom = () => {
        this.props.onChange(getRandomInt(1, 7));
    };

    render() {
        return (
            <div>
                <ButtonGroup className="btnGrpClass">
                    <Button active={this.props.number === 1} onClick={() => this.props.onChange(1)}>1</Button>
                    <Button active={this.props.number === 2} onClick={() => this.props.onChange(2)}>2</Button>
                    <Button active={this.props.number === 3} onClick={() => this.props.onChange(3)}>3</Button>
                    <Button active={this.props.number === 4} onClick={() => this.props.onChange(4)}>4</Button>
                    <Button active={this.props.number === 5} onClick={() => this.props.onChange(5)}>5</Button>
                    <Button active={this.props.number === 6} onClick={() => this.props.onChange(6)}>6</Button>
                </ButtonGroup><br/>
                <Button onClick={() => this.generateRandom()}>Randomize</Button>
                {this.props.number ?
                    <RandomizationResults number={this.props.number}/>
                    : ''}
            </div>
        );
    }
}

export default RandomizationSelector;
