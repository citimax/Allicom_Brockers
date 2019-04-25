import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";

class Users extends Component {
 
  constructor() {
    super();
    this.state = { users: [], 
      reseter: false,
      NewUser: { UserName: "", FullNames: "", Email: "", Password: "", Telephone: "", ConfirmPassword: "", ExpiryDate: "4/25/2019", IsActive:true}
      }}
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

  handleInputChange=(event)=> {
    event.preventDefault();

    this.setState({ NewUser: {[event.target.name]:[event.target.value]}});
    
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    const data = { UserName: this.state.NewUser.UserName, FullNames: this.state.NewUser.FullNames, Email: this.state.NewUser.Email, Password: this.state.NewUser.Password, Telephone: this.state.NewUser.Telephone, ConfirmPassword: this.state.NewUser.ConfirmPassword, ExpiryDate: "4/25/2019", IsActive: true };
  
    this.postData('api/users', data);
    console.log(data);
  }
 postData(url = ``, data = {}) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json().then(data => { console.log(data)})); 
}
  componentDidMount() {
    this.fetchData();
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
        <Breadcumps tablename={"Users"} button={<button to="/" type="button" style={{ marginTop: 40 }} onClick={this.handleclick} className="btn btn-primary float-left">Go Back</button>} />
       
        <Formdata handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} />
       
      </Wrapper>
    );
  }else{
      return (
        <Wrapper>
          <Breadcumps tablename={"Users"} button={<button type="button" style={{ marginTop: 40 }} onClick={this.handleclick} className="btn btn-primary float-left">Create New</button>} />
          <TableWrapper >
            <Table Rows={Rowdata1} columns={ColumnData} />
          </TableWrapper>
        </Wrapper>);
  }
}
}
const Formdata = (props) => {
  return (
  <div className="container-fluid">
      <div className="col-sm-12">
        <div className="ibox ">
          <div className="ibox-title">
            <div className="ibox-tools">
            
              
              <a className="close-link">
                <i className="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div className="ibox-content">
            <form onSubmit={props.handleSubmit} >
              <div className=" row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">UserName</label>
                    <input type="text" name="UserName" onChange={props.handleInputChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />

                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="Email" className="form-control" onChange={props.handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="Password"  type="Password" onChange={props.handleInputChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">FullNames</label>
                    <input type="text" name="FullNames"  onChange={props.handleInputChange} className="form-control" id="exampleInputPassword1" placeholder="FullNames" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Telephone</label>
                    <input type="text" name="Telephone" className="form-control" onChange={props.handleInputChange} id="exampleInputPassword1" placeholder="Telephone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Confirm Password</label>
                    <input type="password" name="ConfirmPassword"  onChange={props.handleInputChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ConfirmPassword" />

                  </div>

                  
                </div>

              </div>
            </form>
            
            
                </div>
              </div>
                </div>
  </div>
  );
};


export default Users;
