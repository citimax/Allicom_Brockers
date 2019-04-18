import React, { Component } from "react";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
                  <a
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                    href="#"
                  >
                    <span className="block m-t-xs font-bold">
                      David Williams
                    </span>
                  </a>
                </div>
                <div className="logo-element">IN+</div>
              </li>
              <li>
                <a href="index-2.html">
                  <i className="fa fa-th-large" />{" "}
                  <span className="nav-label">System Admin</span>{" "}
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <a href="/users">Users</a>
                  </li>
                  <li>
                    <a href="/usergroups">User Groups</a>
                  </li>
                  <li>
                    <a href="/roles">Roles</a>
                  </li>
                  <li>
                    <a href="/userroles">User Roles</a>
                  </li>
                  <li>
                    <a href="/securitygroups">Security Groups </a>
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
