import React, { Component } from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";
class Menus extends Component {
  render() {
    return (
      <li>
        <a href="index-2.html">
          <i className="fa fa-th-large" />{" "}
          <span className="nav-label">System Admin</span>{" "}
          <span className="fa arrow" />
        </a>
      
          <ul className="nav nav-second-level collapse">
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/usergroups" activeStyle={{ color: "red" }}>
                User Groups
              </Link>
            </li>
            <li>
              <Link to="/roles" activeClassName={"active"}>
                Roles
              </Link>
            </li>
            <li>
              <Link to="/userroles">User Roles</Link>
            </li>
            <li>
              <Link to="/securitygroups">Security Groups </Link>
            </li>
          </ul>
        
      </li>
    );
  }
}
export default Menus;
