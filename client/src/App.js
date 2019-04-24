import React, {Component} from 'react';
import { BrowserRouter, Route, Link ,IndexRoute} from "react-router-dom";
import UsersPage from './Components/pages/users';
import UsergroupsPage from './Components/pages/usergroups';

import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./Components/Users";
import UserGroups from "./Components/UserGroups";

import Menus from "./Components/links";
import Login from "./Components/Login";

class App extends Component {
  render() {
    return ( 
      <BrowserRouter>
        <Route path="/" exact component={UsersPage}></Route> 
          <Route path="/users" exact component={UsersPage}></Route>
          <Route path="/usergroups" exact component={UsergroupsPage}></Route>
       
     </BrowserRouter> );
  }
}

export default App;
