import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Appbar from "./components/Appbar";

export default class App extends Component {
  render() {
    return (
      <div>
        <Appbar />
        <Dashboard />
      </div>
    );
  }
}
