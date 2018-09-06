// @flow

import React, { Component } from 'react';
import range from 'lodash/range';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import './CryptoboxSelector.css';
import {Checkbox} from "react-bootstrap";

type BoxState = "empty" | "gray" | "brown";
export type CryptoboxState = BoxState[][];
const emptyRow : BoxState[] = ["empty", "empty", "empty"];

type CryptoboxProps = {
  state: CryptoboxState,
  onChange: (CryptoboxState) => void,
  onSetKey: (boolean) => void,
  disabled: boolean,
  keySelected: number,
  keyCol: number
};

const numRows = 4;
const numCols = 3;
const colLabels = ['L', 'C', 'R'];

class CryptoboxSelector extends Component<CryptoboxProps> {
    static defaultProps = {
        state: [clone(emptyRow), clone(emptyRow), clone(emptyRow), clone(emptyRow)],
    };

    onClick = (i : number, j : number) => {
      if(this.props.disabled) return;
      const ret : CryptoboxState = cloneDeep(this.props.state);
      if(ret[i][j] === "empty") {
          ret[i][j] = "gray";
      } else if(ret[i][j] === "gray") {
          ret[i][j] = "brown";
      } else if(ret[i][j] === "brown") {
          ret[i][j] = "empty";
      }
      this.props.onChange(ret);
    };

    render() {
        return (
            <table>
                <tbody>
                {this.props.state.map((row, i) =>
                <tr key={i}>
                  <td/>
                    {row.map((elem, j) =>
                        <td className={"cryptobox-box cryptobox-state-" + elem} key={j} onClick={() => this.onClick(i, j)}/>
                    )}
                </tr>
                )}
                {
                  typeof this.props.keyCol === 'number' ?
                      <tr>
                        <td>Key</td>
                        { [...Array(numCols).keys()].map((i) =>
                          i === this.props.keyCol ?
                              <td style={{textAlign: "center"}}><input type="checkbox"
                                  onChange={(p) => {this.props.onSetKey(p.target.checked)}}
                                  checked={this.props.keySelected}
                                  inline/></td>:
                              <td/>
                        ) }
                      </tr>
                      : null

                }
                <tr>
                  <td/>
                    {colLabels.map((lbl, i) =>
                        <td key={i} className={"cryptobox-label"}>{lbl}</td>
                    )}
                </tr>
                </tbody>
            </table>
        );
    }
}

export default CryptoboxSelector;
