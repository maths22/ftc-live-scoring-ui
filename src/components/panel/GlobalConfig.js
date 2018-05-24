// @flow

import React, { Component } from 'react';
import { ButtonGroup, Button } from "react-bootstrap";
import type {PanelsConfig} from "../../types/Config";
import {defaults} from "lodash";

export type Color = "red" | "blue" | "both";

type AutoJewelProps = {
    //TODO consider order?
    config: PanelsConfig,
    onChange: (PanelsConfig) => void,
};

class AutoJewelSelector extends Component<AutoJewelProps> {
    static defaultProps = {
        config: {},
    };

    onChange = (newState : PanelsConfig) => {
        const sendState : PanelsConfig = defaults({}, newState, this.props.config);
        this.props.onChange(sendState);
    };

    render() {
        return [
            <div>
                <span>Number of Fields: </span>
                <ButtonGroup className="btnGrpClass">
                    <Button active={this.props.config.fieldCount === 1} onClick={() => this.onChange({fieldCount: 1})}>1</Button>
                    <Button active={this.props.config.fieldCount === 2} onClick={() => this.onChange({fieldCount: 2})}>2</Button>
                    <Button active={this.props.config.fieldCount === 3} onClick={() => this.onChange({fieldCount: 3})}>3</Button>
                </ButtonGroup>
            </div>,
            <div>
                <span>Tablets per Field: </span>
                <ButtonGroup className="btnGrpClass">
                    <Button active={this.props.config.tabletCount === 1} onClick={() => this.onChange({tabletCount: 1})}>1</Button>
                    <Button active={this.props.config.tabletCount === 2} onClick={() => this.onChange({tabletCount: 2})}>2</Button>
                    <Button active={this.props.config.tabletCount === 3} onClick={() => this.onChange({tabletCount: 3})}>3</Button>
                </ButtonGroup>
            </div>
        ];
    }
}

export default AutoJewelSelector;
