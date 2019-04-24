import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";

class Users extends Component {
 
  constructor() {
    super();
    this.state = { users: [],reseter: false};
    
  }
 handleclick=(e)=>{
   e.preventDefault();
   if (this.state.reseter === false){
     this.setState({ reseter: true })
   }else{
     this.setState({ reseter: false })
   }
   
 }
  fetchData = () => {
    fetch("api/users")
      .then(res => res.json())
      .then(Users => {
        this.setState({ users: Users });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

 TonglePage=(e)=>{
   e.preventDefault();
   console.log("clicked")
    
  
 }

  render() {
   
    
   
   
    const ColumnData = [
      {
        label: "UserName",
        field: "UserName",
        sort: "asc",
        width: 250
      },
      {
        label: "FullNames",
        field: "FullNames",
        sort: "asc",
        width: 270
      },
      {
        label: "Email",
        field: "Email",
        sort: "asc",
        width: 200
      },
      {
        label: "Telephone",
        field: "Telephone",
        sort: "asc",
        width: 200
      },
      {
        label: "ExpiryDate",
        field: "ExpiryDate",
        sort: "asc",
        width: 200
      },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];
   const Rows = [...this.state.users]
    Rows.map((k,i)=> {
      let Rowdata = {
        username: k.UserName,
        FullNames: k.FullNames,
        Email: k.Email,
        Telephone: k.Telephone,
        ExpiryDate: k.ExpiryDate,
        action: <span> <a href="">Edit</a>| <a href="">Delete</a></span>
      };
      Rowdata1.push(Rowdata);
    });
  
    if (this.state.reseter) {
    return (
      <Wrapper>
        <Breadcumps tablename={"Users"} newClick={() => this.handleclick} />
       
        <Formdata/>
       
      </Wrapper>
    );
  }else{
      return (
        <Wrapper>
          <Breadcumps tablename={"Users"} newClick={(e) => this.handleclick} />
          <TableWrapper >
            
            <Table Rows={Rowdata1} columns={ColumnData} />
          </TableWrapper>
        </Wrapper>);
  }
}
}
const Formdata = () => {
  return (
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
          <button type="submit" class="btn btn-primary">Submit</button>
</form>);
};


export default Users;
