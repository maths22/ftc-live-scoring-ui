import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Config from "./components/panel/Config";


class App extends Component {

  render() {
    return (
        <BrowserRouter>
        <div>
            <div>
                <Route path="/config" component={Confizg}/>
            </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
