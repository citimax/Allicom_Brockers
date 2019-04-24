import React, { Component } from "react";
import NavTop from "./nav_top";
import Breadcumps from "./breadcumps";
import Footer from "./footer";

class wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  render() {
    return (
      <div id="page-wrapper" className="gray-bg">
        <NavTop />

        {this.props.children}

        <Footer />
      </div>
    );
  }
}

export default wrapper;
