import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UsersPage from "./Components/pages/users";
import UsergroupsPage from "./Components/pages/usergroups";
import UserRoles from "./Components/pages/UserRoles";
import Company from "./Components/pages/company";
import login from "./Components/Login";
import Profile from "./Components/pages/profile";

import roles from "./Components/pages/roles";
import countries from "./Components/pages/Countries";
import counties from "./Components/pages/counties";
import securitygroups from "./Components/pages/securitygroups";
import costCenter from "./Components/pages/costCenter";
import PolicyCategories from "./Components/pages/Underwriting/PolicyCategories";
import PaymentModes from "./Components/pages/Underwriting/PaymentModes";
import InsuranceCompanies from "./Components/pages/Underwriting/Insurer";
import PolicyClasses from "./Components/pages/Underwriting/PolicyClasses";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={login} />
        <Route path="/users" exact component={UsersPage} />
        <Route path="/countries" exact component={UsersPage} />
        <Route path="/profile" exact component={Profile} />

        <Route path="/roles" exact component={roles} />
        <Route path="/countries" exact component={countries} />
        <Route path="/securitygroups" exact component={securitygroups} />
        <Route path="/counties" exact component={counties} />
        <Route path="/costCenter" exact component={costCenter} />
        <Route path="/userroles" exact component={UserRoles} />
        <Route path="/company" exact component={Company} />
        <Route path="/usergroups" exact component={UsergroupsPage} />
        <Route path="/PolicyCategories" exact component={PolicyCategories} />
        <Route path="/PaymentModes" exact component={PaymentModes} />
        <Route path="/Insurer" exact component={InsuranceCompanies} />
        <Route path="/PolicyClasses" exact component={PolicyClasses} />
      </BrowserRouter>
    );
  }
}

export default App;
