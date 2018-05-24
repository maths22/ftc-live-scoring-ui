import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link, Route} from "react-router-dom";

var Config = () => {
    return "CONFIG!!!";
};

class App extends Component {

  render() {
    return (
        <div>
            <div>
                <Route path="/config" component={Config}/>
            </div>
        </div>
    );
  }
}

export default App;
