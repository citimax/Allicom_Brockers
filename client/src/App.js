import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UsersPage from "./Components/pages/users";
import UsergroupsPage from "./Components/pages/usergroups";
import login from "./Components/Login";
import roles from "./Components/pages/roles";
import countries from "./Components/pages/Countries";
import counties from "./Components/pages/counties";
import securitygroups from "./Components/pages/securitygroups";
import costCenter from "./Components/pages/costCenter";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={login} />
        <Route path="/users" exact component={UsersPage} />
        <Route path="/usergroups" exact component={UsergroupsPage} />
        <Route path="/roles" exact component={roles} />
        <Route path="/countries" exact component={countries} />
        <Route path="/securitygroups" exact component={securitygroups} />
        <Route path="/counties" exact component={counties} />
        <Route path="/costCenter" exact component={costCenter} />
      </BrowserRouter>
    );
  }
}

export default App;
