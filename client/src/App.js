import React, { Component } from "react";
import Nav from "./Components/nav.jsx";
import Wrapper from "./Components/wrapper";

import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./Components/Users";
import UserGroups from "./Components/UserGroups";

import Menus from "./Components/links";
import Login from "./Components/Login";

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Router>
          <Nav>
            <Menus />
          </Nav>
          <Wrapper>
            <Route path="/users" exact component={User} />
            <Route path="/usergroups" exact component={UserGroups} />
          </Wrapper>
        </Router>
      </div>
    );
  }
}

export default App;
{
  /* <Router>
  <div id="wrapper">
    <Route
      path="/"
      exact="true"
      render={() => {
        return (
          <div>
            <Nav />
            <h1>Login Here</h1>
            <Wrapper />
          </div>
        );
      }}
    />
    <Route
      path="/About"
      exact="true"
      render={() => {
        return <h1>About About</h1>;
      }}
    />
  </div>
</Router> */
}
