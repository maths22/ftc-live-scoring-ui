// @flow

import React, {Component} from 'react';
import "./RandomizationResults.css";

import die1 from "./randomization/die-1.png";
import die2 from "./randomization/die-2.png";
import die3 from "./randomization/die-3.png";
import die4 from "./randomization/die-4.png";
import die5 from "./randomization/die-5.png";
import die6 from "./randomization/die-6.png";

import samplePosL from "./randomization/sample_pos-l.png";
import samplePosC from "./randomization/sample_pos-c.png";
import samplePosR from "./randomization/sample_pos-r.png";

const dice = {
  '1': die1,
  '2': die2,
  '3': die3,
  '4': die4,
  '5': die5,
  '6': die6,
};

const samplePos = {
  'l': samplePosL,
  'c': samplePosC,
  'r': samplePosR,
};
const sampleKeys = ['l', 'c', 'r'];
const sampleLabels = ["Left", "Center", "Right"];

type RandomizationProps = {
  number: number,
};

class RandomizationResults extends Component<RandomizationProps> {

  render() {
    if (!this.props.number) return <span>Awaiting randomization</span>;
    const dieImage = dice[this.props.number];
    let num = this.props.number;
    if (num > 3) num = 7 - num;
    const sampleImage = samplePos[sampleKeys[num - 1]];
    return (
        <div style={{width: "20em"}}>
          <img src={sampleImage} className={"centeredImage"} style={{width: "20em"}}/><br/>
          <img src={dieImage} style={{width: "4em", marginLeft: "1em"}}/>
          <span style={{fontSize: "x-large", fontWeight: "bold"}}> {sampleLabels[(this.props.number - 1) % 3]}</span>
        </div>
    );
  }
}

export default RandomizationResults;
