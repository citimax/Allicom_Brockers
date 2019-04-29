import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import swal from "sweetalert";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      reseter: false,
      UserName: "",
      FullNames: "",
      Email: "",
      Password: "",
      Telephone: "",
      ConfirmPassword: "",
      ExpiryDate: "4/25/2099",
      IsActive: true
    };
  }

  handleclick = e => {
    e.preventDefault();
    if (this.state.reseter === false) {
      this.setState({ reseter: true });
    } else {
      this.setState({ reseter: false });
    }
  };
  handleStateReset() {
    this.setState({
      UserName: "",
      FullNames: "",
      Email: "",
      Password: "",
      Telephone: "",
      ConfirmPassword: "",
      ExpiryDate: "4/25/2099",
      IsActive: true
    });
  }
  fetchData = () => {
    fetch("api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Users => {
        if (Users.length > 0) {
          this.setState({ users: Users });
        } else {
          swal("Oops!", Users.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleDelete = username => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/users/" + username, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                swal("Deleted!", "Record has been deleted!", "success");
              } else {
                swal("error!", data.message, "error");
              }
              this.fetchData();
            })
          )
          .catch(err => {
            swal("Oops!", err.message, "error");
          });
      }
    });
  };
  handleEdit = User => {
    const data = {
      UserName: User.UserName,
      FullNames: User.FullNames,
      Email: User.Email,
      Password: User.Password,
      Telephone: User.Telephone,
      ConfirmPassword: User.ConfirmPassword,
      ExpiryDate: "4/25/2099",
      IsActive: true
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      UserName: this.state.UserName,
      FullNames: this.state.FullNames,
      Email: this.state.Email,
      Password: this.state.Password,
      Telephone: this.state.Telephone,
      ConfirmPassword: this.state.ConfirmPassword,
      ExpiryDate: "4/25/2099",
      IsActive: true
    };

    this.postData("api/users", data);
  };
  postData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          this.fetchData();
          this.handleStateReset();
          if (data.success) {
            swal("Saved!", "Record has been saved!", "success");
          } else {
            swal("Saved!", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
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
    const Rows = [...this.state.users];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          username: k.UserName,
          FullNames: k.FullNames,
          Email: k.Email,
          Telephone: k.Telephone,
          ExpiryDate: k.ExpiryDate,
          action: (
            <span>
              {" "}
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.handleEdit(k, e)}>
                Edit
              </a>
              |{" "}
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.handleDelete(k.UserName, e)}>
                {" "}
                Delete
              </a>
            </span>
          )
        };
        Rowdata1.push(Rowdata);
      });
    }

    if (this.state.reseter) {
      return (
        <Wrapper>
          <Breadcumps
            tablename={"Users"}
            button={
              <button
                to='/'
                type='button'
                style={{ marginTop: 40 }}
                onClick={this.handleclick}
                className='btn btn-primary float-left'>
                Go Back
              </button>
            }
          />

          <Formdata
            Values={this.state}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Breadcumps
            tablename={"Users"}
            button={
              <button
                type='button'
                style={{ marginTop: 40 }}
                onClick={this.handleclick}
                className='btn btn-primary float-left'>
                Create New
              </button>
            }
          />
          <TableWrapper>
            <Table Rows={Rowdata1} columns={ColumnData} />
          </TableWrapper>
        </Wrapper>
      );
    }
  }
}
const Formdata = props => {
  return (
    <div className='container-fluid'>
      <div className='col-sm-12'>
        <div className='ibox '>
          <div className='ibox-title'>
            <div className='ibox-tools'>
              <a className='close-link'>
                <i className='fa fa-times' />
              </a>
            </div>
          </div>
          <div className='ibox-content'>
            <form onSubmit={props.handleSubmit}>
              <div className=' row'>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='Username'>UserName</label>
                    <input
                      type='text'
                      name='UserName'
                      value={props.Values.UserName}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter Username'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Email address</label>
                    <input
                      type='email'
                      name='Email'
                      value={props.Values.Email}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Email'
                      aria-describedby='emailHelp'
                      placeholder='Enter email'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Password</label>
                    <input
                      name='Password'
                      type='Password'
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputPassword1'
                      placeholder='Password'
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='FullNames'>FullNames</label>
                    <input
                      type='text'
                      name='FullNames'
                      value={props.Values.FullNames}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='FullNames'
                      placeholder='FullNames'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Telephone'>Telephone</label>
                    <input
                      type='text'
                      name='Telephone'
                      value={props.Values.Telephone}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Telephone'
                      placeholder='Telephone'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='ConfirmPassword'>Confirm Password</label>
                    <input
                      type='password'
                      name='ConfirmPassword'
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='ConfirmPassword'
                      aria-describedby='emailHelp'
                      placeholder='ConfirmPassword'
                    />
                  </div>
                </div>
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
