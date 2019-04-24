import React, {Component} from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import UsersPage from './Components/pages/users';
import UsergroupsPage from './Components/pages/usergroups';




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
