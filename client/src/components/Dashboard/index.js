import React, { Component } from "react";
import Table from "./Table";
import { Container } from "@material-ui/core";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Container style={{ padding: 10 }}>
          <Table />
        </Container>
      </div>
    );
  }
}
