// @flow

import React, { Component } from 'react';
import {ButtonGroup, Button, Panel, Alert} from "react-bootstrap";
import {defaults} from "lodash";
import type {GlobalPanelsConfig} from "../../data/Config";
import {PanelConfig} from "../../data/Config";

import {observer} from 'mobx-react';

export type Color = "red" | "blue" | "both";

type ConfigProps = {
    //TODO consider order?
    globalConfig: GlobalPanelsConfig,
    panelConfig: PanelConfig,
};

@observer
class Config extends Component<ConfigProps> {
    static defaultProps = {
      globalConfig: {},
    };

    render() {
        return [
          <Panel>
            <Panel.Heading>Global Configuration</Panel.Heading>
            <Panel.Body>
            <div>
                <span>Number of Fields: </span>
                <ButtonGroup className="btnGrpClass">
                    <Button active={this.props.globalConfig.fieldCount === 1}
                            onClick={() => this.props.globalConfig.setFieldCount(1)}>1</Button>
                    <Button active={this.props.globalConfig.fieldCount === 2}
                            onClick={() => this.props.globalConfig.setFieldCount(2)}>2</Button>
                    <Button active={this.props.globalConfig.fieldCount === 3}
                            onClick={() => this.props.globalConfig.setFieldCount(3)}>3</Button>
                </ButtonGroup>
            </div>
            <div>
                <span>Tablets per Field: </span>
                <ButtonGroup className="btnGrpClass">
                    <Button active={this.props.globalConfig.tabletCount === 1}
                            onClick={() => this.props.globalConfig.setTabletCount(1)}>1</Button>
                    <Button active={this.props.globalConfig.tabletCount === 2}
                            onClick={() => this.props.globalConfig.setTabletCount(2)}>2</Button>
                    <Button active={this.props.globalConfig.tabletCount === 3}
                            onClick={() => this.props.globalConfig.setTabletCount(3)}>3</Button>
                </ButtonGroup>
                { this.props.globalConfig.tabletCount ? <Alert bsStyle="warning">
                  <strong>Warning!</strong> Make sure to update all tablet roles after changing the number of tablets per field!
                </Alert> : null}
            </div>
            </Panel.Body>
          </Panel>,
          (this.props.globalConfig.fieldCount && this.props.globalConfig.tabletCount) ? <Panel>
            <Panel.Heading>Panel Configuration</Panel.Heading>
            <Panel.Body>
              <div>
                <span>Panel Field: </span>
                <ButtonGroup className="btnGrpClass">
                  <Button active={this.props.panelConfig.field === 1}
                          onClick={() => this.props.panelConfig.setField(1)}>1</Button>
                  {this.props.globalConfig.fieldCount >= 2 ?
                    <Button active={this.props.panelConfig.field === 2}
                            onClick={() => this.props.panelConfig.setField(2)}>2</Button> : null}
                  {this.props.globalConfig.fieldCount >= 3 ?
                    <Button active={this.props.panelConfig.field === 3}
                            onClick={() => this.props.panelConfig.setField(3)}>3</Button> : null}
                </ButtonGroup>
              </div>
              <div>
                <span>Panel Role: </span>
                <ButtonGroup className="btnGrpClass">
                  {this.props.globalConfig.tabletCount !== 2 ?
                    <Button active={this.props.panelConfig.role === "ref"}
                            onClick={() => this.props.panelConfig.setRole("ref")}>Referee</Button> : null}
                  {this.props.globalConfig.tabletCount >= 2 ?
                    <Button active={this.props.panelConfig.role === "red"}
                            onClick={() => this.props.panelConfig.setRole("red")}>Red</Button> : null}
                  {this.props.globalConfig.tabletCount >= 2 ?
                    <Button active={this.props.panelConfig.role === "blue"}
                            onClick={() => this.props.panelConfig.setRole("blue")}>Blue</Button> : null}
                </ButtonGroup>
              </div>
            </Panel.Body>
          </Panel> : null
        ];
    }
}

export default Config;
