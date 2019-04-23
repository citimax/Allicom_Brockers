import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

class Tables extends Component {
  render() {
    const data = {
      columns: this.props.columns,
      rows: this.props.Rows
    };
    return <MDBDataTable striped bordered hover data={data} />;
  }
}

export default Tables;
