import React, {Component} from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import UsersPage from './Components/pages/users';
import UsergroupsPage from './Components/pages/usergroups';
import UserRoles from './Components/pages/UserRoles';
import Company from './Components/pages/company';
import login from './Components/login';




class App extends Component {
  render() {
    return ( 
      <BrowserRouter>
        <Route path="/" exact component={login}></Route> 
        <Route path="/users" exact component={UsersPage}></Route>
        <Route path="/userroles" exact component={UserRoles}></Route>
        <Route path="/company" exact component={Company}></Route>
          <Route path="/usergroups" exact component={UsergroupsPage}></Route>
       
     </BrowserRouter> );
  }
}

export default App;
