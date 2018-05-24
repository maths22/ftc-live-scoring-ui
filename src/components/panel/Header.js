// @flow

import React, { Component } from 'react';
import {Grid, Row, Col, Button, FormControl} from "react-bootstrap";
import defaults from "lodash/defaults";
import Counter from "../../widgets/Counter";
import RolesUtil from "../../utils/RolesUtil";
import type {PanelRole, PanelsConfig} from "../../types/Config";

type Match = {
    number: String,
};

type HeaderProps = {
    matchList: Match[],
    selectedMatch: ?Match,
    role: PanelRole,
    config: PanelsConfig,
    onSelect: (Match) => void,
};

class Header extends Component<HeaderProps> {
    static defaultProps = {
        matchList: [],
        selectedMatch: null,
    };

    renderMatchSelector = () => {
        const selectedIdx = this.props.matchList.indexOf(this.props.selectedMatch);
        return <FormControl componentClass="select" value={selectedIdx}>
            {this.props.matchList.map((m, idx) => <option value={idx} >{m.number}</option>)}
        </FormControl>;
    };

    render() {
        const showMatchChange = RolesUtil.canChangeMatch(this.props.role, this.props.config);
        const matchLabel = this.props.selectedMatch ? this.props.selectedMatch.number : "No match selected"
        return (
            <div>
                <span className="pull-left">
                    {RolesUtil.toDisplay(this.props.role)}
                </span>
                <span className="lead">
                    {showMatchChange ? this.renderMatchSelector() : matchLabel }
                </span>
            </div>
        );
    }
}

export default Header;
