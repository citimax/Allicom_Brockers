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
                  <a
                    href="/profile"
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                  >
                    <span className="block m-t-xs font-bold">
                      David Williams
                    </span>
                  </a>
                </div>
                <div className="logo-element">IN+</div>
              </li>
              <li>
                <a href="/profile">
                  <i className="fa fa-th-large" />
                  <span className="nav-label">System Admin</span>
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

              <li>
                <a href="#">
                  <i className="fa fa-bar-chart-o" />{" "}
                  <span className="nav-label">UnderWriting</span>
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <Link to="/counties">counties </Link>
                  </li>
                  <li>
                    <a href="graph_morris.html">Morris.js Charts</a>
                  </li>
                  <li>
                    <a href="graph_rickshaw.html">Rickshaw Charts</a>
                  </li>
                  <li>
                    <a href="graph_chartjs.html">Chart.js</a>
                  </li>
                  <li>
                    <a href="graph_chartist.html">Chartist</a>
                  </li>
                  <li>
                    <a href="c3.html">c3 charts</a>
                  </li>
                  <li>
                    <a href="graph_peity.html">Peity Charts</a>
                  </li>
                  <li>
                    <a href="graph_sparkline.html">Sparkline Charts</a>
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
