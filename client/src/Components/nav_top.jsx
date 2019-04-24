import React, { Component } from "react";

class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top"
          role="navigation"
          style={{ marginBottom: 0 + "em" }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary "
              href="#"
            >
              <i className="fa fa-bars" />{" "}
            </a>
          </div>
          <ul className=" navbar-header nav navbar-top-links navbar-right">
            <li>
              <span className="m-r-sm text-muted welcome-message">
                Welcome to Allicom Insurance Brockers.
              </span>
            </li>

            <li>
              <a href="login.html">
                <i className="fa fa-sign-out" /> Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavTop;
