// @flow

import React, { Component } from 'react';
import { Form, FormControl, ButtonGroup, Button } from "react-bootstrap";
import './Counter.css';


type CounterProps = {
    value: number;
    onChange: (number) => void;
    min: number;
    max: number;
};

type CounterState = {
    value: string;
};

class Counter extends Component<CounterProps, CounterState> {
    static defaultProps = {
        min: 0,
        max: 99
    };

    constructor(props: CounterProps) {
        super(props);
        this.state = {
            value: props.value.toString(),
        };
    }

    componentWillReceiveProps(nextProps: CounterProps) {
        if(this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value.toString()});
        }
    }


    onBlur = (e : SyntheticInputEvent<>) => {
        const intVal: number = parseInt(e.target.value);
        const newVal: number = Math.min(Math.max(intVal, this.props.min), this.props.max);
        this.setState({value: newVal.toString()});
        this.props.onChange(newVal);
    };

    onChange = (e : SyntheticInputEvent<>) => {
        this.setState({value: e.target.value});
    };

    clickMinus = () => {
        const intVal: number = parseInt(this.state.value);
        const newVal: number = Math.max(intVal - 1, this.props.min);
        this.setState({value:newVal.toString()});
        this.props.onChange(newVal);
    };

    clickPlus = () => {
        const intVal: number = parseInt(this.state.value);
        const newVal: number = Math.min(intVal + 1, this.props.max);
        this.setState({value: newVal.toString()});
        this.props.onChange(newVal);
    };

    render() {
        return (
            <span className={"form-inline counter"}>
                <FormControl
                    type="number"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    min={this.props.min}
                    max={this.props.max}
                />
                <ButtonGroup className="btnGrpClass">
                    <Button onClick={this.clickMinus}>-</Button>
                    <Button onClick={this.clickPlus}>+</Button>
                </ButtonGroup>
            </span>
        );
    }
}

export default Counter;
