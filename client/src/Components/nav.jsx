import React, { Component } from "react";
import { Link } from "react-router-dom";
class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element">
                  <img
                    alt="image"
                    className="rounded-circle"
                    src="img/profile_small.jpg"
                  />
                  <Link
                    to="/"
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href="/"
                  >
                    <span className="block m-t-xs font-bold">
                      David Williams
                    </span>
                  </Link>
                </div>
                <div className="logo-element">IN+</div>
              </li>
              <li>
                <a>
                  <i className="fa fa-th-large" />{" "}
                  <span className="nav-label">system Admin</span>{" "}
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <Link to="/costCenter">costCenter</Link>
                  </li>
                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                  <li>
                    <Link to="/usergroups">User Groups</Link>
                  </li>
                  <li>
                    <Link to="/roles">Roles</Link>
                  </li>
                  <li>
                    <Link to="/userroles">User Roles</Link>
                  </li>
                  <li>
                    <Link to="/securitygroups">Security Groups </Link>
                  </li>
                  <li>
                    <Link to="/countries">countries </Link>
                  </li>
                  <li>
                    <Link to="/counties">counties </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
