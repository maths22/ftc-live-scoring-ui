import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Config from "./components/pages/Config";
import {GlobalPanelsConfig, PanelConfig} from "./data/Config";
import {State} from "./data/State";
import Main from "./components/pages/Main";
import {autorun} from "mobx";
import {observer} from "mobx-react";

@observer
class App extends Component {
  state = new State();

  componentDidMount() {
    autorun(() => this.state.loadFieldConfig(this.state.panelConfig.field))
    this.state.startWebsocket()
  }

  render() {
    return (
        <BrowserRouter>
        <div>
            <div>
              <Route exact path="/config" render={() => <Config globalConfig={this.state.globalConfig} panelConfig={this.state.panelConfig}/>}/>
              <Route exact path="/" render={() => <Main globalConfig={this.state.globalConfig} panelConfig={this.state.panelConfig} state={this.state}/>}/>
            </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
