// @flow

import React, { Component } from 'react';
import {ButtonGroup, Button, Panel, Alert} from "react-bootstrap";
import {defaults} from "lodash";
import type {GlobalPanelsConfig} from "../../data/Config";
import {PanelConfig} from "../../data/Config";
import ConfigPanel from "../panel/Config";

import {observer} from 'mobx-react';
import {Link} from "react-router-dom";
import Api from "../../api";

type ConfigProps = {
  globalConfig: GlobalPanelsConfig,
  panelConfig: PanelConfig,
};

@observer
class Config extends Component<ConfigProps> {
  api: Api = new Api();

  reset() {
    const cont = window.confirm("Are you sure you want to reset the scoring results?  ALL DATA WILL BE LOST");
    if(cont) {
      this.api.reset();
      window.location.reload(false);
    }
  }

  render() {
    return <div className="container">
      <Link to="/">Back</Link>
      <ConfigPanel {...this.props} />
      <Button onClick={() => this.api.configurePrinter()}>Configure Printer</Button>
      <Button onClick={() => this.reset()}>Reset</Button>
    </div>;
  }
}

export default Config;
