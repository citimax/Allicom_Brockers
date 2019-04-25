import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Users extends Component {
 
  constructor() {
    super();
    this.state = { users: [], 
      reseter: false,
       UserName: "", FullNames: "", Email: "", Password: "", Telephone: "", ConfirmPassword: "", ExpiryDate: "4/25/2019", IsActive:true,
      }}


  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
 handleclick=(e)=>{
   e.preventDefault();
   if (this.state.reseter === false){
     this.setState({ reseter: true })
   }else{
     this.setState({ reseter: false })
   }
   this.handleStateReset();
 }
  handleStateReset() {
    this.setState({ UserName: "", FullNames: "", Email: "", Password: "", Telephone: "", ConfirmPassword: "", ExpiryDate: "4/25/2019", IsActive: true });
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
    this.setState({ [event.target.name]:event.target.value}); 
     
  }
  handleDelete = (username) => {
    console.log(username);
    return fetch('api/users/' + username, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json().then(data => { 
        this.fetchData();
        console.log(data) })); 
  }
  handleEdit = (User) => {
    const data = { UserName: User.UserName, FullNames: User.FullNames, Email: User.Email, Password: User.Password, Telephone: User.Telephone, ConfirmPassword: User.ConfirmPassword, ExpiryDate: "4/25/2019", IsActive: true };
    this.setState(data);
    this.setState({ reseter: true })
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    const data = { UserName: this.state.UserName, FullNames: this.state.FullNames, Email: this.state.Email, Password: this.state.Password, Telephone: this.state.Telephone, ConfirmPassword: this.state.ConfirmPassword, ExpiryDate: "4/25/2019", IsActive: true };
  
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
    .then(response => response.json().then(data => { 
      this.fetchData();
      this.handleStateReset();
      console.log(data)})); 
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
        action: <span> <a style={{ color: "#007bff" }} onClick={(e) => this.handleEdit(k, e)} >Edit</a>| <a style={{ color:"#007bff"}} onClick={(e) => this.handleDelete(k.UserName,e)} >  Delete</a></span>
      };
      Rowdata1.push(Rowdata);
    });
  
    if (this.state.reseter) {
    return (
      <Wrapper>
        <Breadcumps tablename={"Users"} button={<button to="/" type="button" style={{ marginTop: 40 }} onClick={this.handleclick} className="btn btn-primary float-left">Go Back</button>} />
       
        <Formdata Values={this.state} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} />
       
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
                    <input type="text" name="UserName" value={props.Values.UserName} onChange={props.handleInputChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />

                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="Email" value={props.Values.Email} className="form-control" onChange={props.handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

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
                    <input type="text" name="FullNames" value={props.Values.FullNames}  onChange={props.handleInputChange} className="form-control" id="exampleInputPassword1" placeholder="FullNames" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Telephone</label>
                    <input type="text" name="Telephone" value={props.Values.Telephone} className="form-control" onChange={props.handleInputChange} id="exampleInputPassword1" placeholder="Telephone" />
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
