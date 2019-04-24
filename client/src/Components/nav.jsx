import React, { Component } from "react";
import ReactDOM from "react-dom";

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
              {this.props.children}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
