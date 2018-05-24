// @flow

import React, { Component } from 'react';
import "./RandomizationResults.css";

import die1 from "./randomization/die-1.png";
import die2 from "./randomization/die-2.png";
import die3 from "./randomization/die-3.png";
import die4 from "./randomization/die-4.png";
import die5 from "./randomization/die-5.png";
import die6 from "./randomization/die-6.png";
const dice = {
    '1': die1,
    '2': die2,
    '3': die3,
    '4': die4,
    '5': die5,
    '6': die6,
};

import jewelRedL from "./randomization/jewel-red-l.png";
import jewelRedR from "./randomization/jewel-red-r.png";
const jewels = {
    'redL': jewelRedL,
    'redR': jewelRedR,
};
const jewelKeys = ['redL', 'redR'];

import pictographL from "./randomization/pictograph-l.png";
import pictographC from "./randomization/pictograph-c.png";
import pictographR from "./randomization/pictograph-r.png";
const pictographs = {
    'l': pictographL,
    'c': pictographC,
    'r': pictographR,
};
const pictographKeys = ['l', 'c', 'r'];
const pictographLabels = ["Left", "Center", "Right"];

type RandomizationProps = {
    number: number,
};

class RandomizationResults extends Component<RandomizationProps> {

    render() {
        const dieImage = dice[this.props.number];
        const pictographImage = pictographs[pictographKeys[(this.props.number - 1) % 3]];
        const jewelImage = jewels[jewelKeys[Math.floor((this.props.number - 1) / 3)]];
        return (
            <div style={{width: "20em"}}>
                <img src={pictographImage} className={"centeredImage"} style={{width: "20em"}}/><br/>
                <img src={jewelImage} className={"centeredImage"} style={{width: "15em"}}/><br/>
                <img src={dieImage} style={{width: "4em", marginLeft: "1em"}}/>
                <span style={{fontSize: "x-large", fontWeight: "bold"}}> {pictographLabels[(this.props.number - 1) % 3]}</span>
            </div>
        );
    }
}

export default RandomizationResults;
