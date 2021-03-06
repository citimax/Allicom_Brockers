import React, { Component } from "react";
import NavTop from "./nav_top";
import Footer from "./footer";
import Nav from "./nav";

class wrapper extends Component {
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
