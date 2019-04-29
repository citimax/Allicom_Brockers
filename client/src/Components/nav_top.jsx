import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavTop extends Component {
  render() {
    const handleClearToken = () => {
      localStorage.removeItem("token");
    };

    return (
      <div className='row border-bottom'>
        <nav
          className='navbar navbar-static-top'
          role='navigation'
          style={{ marginBottom: 0 + "em" }}>
          <div className='navbar-header'>
            <a
              className='navbar-minimalize minimalize-styl-2 btn btn-primary '
              href='#'>
              <i className='fa fa-bars' />{" "}
            </a>
          </div>
          <ul className=' navbar-header nav navbar-top-links navbar-right'>
            <li>
              <span className='m-r-sm text-muted welcome-message'>
                Welcome to Allicom Broker Master.
              </span>
            </li>

            <li>
              <Link to='/' onClick={handleClearToken}>
                <i className='fa fa-sign-out' /> Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavTop;
