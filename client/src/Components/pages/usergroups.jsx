import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import swal from "sweetalert";
class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usergroups: [],
      Usersdata: [],
      SecurityGroups: [],
      UserName: "",
      GroupCode: "",
      Narration: ""
    };
  }
  fetchSecurityGroups = () => {
    fetch("api/securityGroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ SecurityGroups: data });
        } else {
          swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  //end

  fetchUsers = () => {
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
          this.setState({ Usersdata: Users });
        } else {
          swal("Oops!", Users.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  //end

  fetchData = () => {
    fetch("api/Usergroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Usergroups => {
        if (Usergroups.length > 0) {
          this.setState({ usergroups: Usergroups });
        } else {
          swal("Oops!", Usergroups.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
        swal("Oops!, data.message, error");
      });
  };
  //end

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      UserName: this.state.UserName,
      GroupCode: this.state.GroupCode,
      Narration: this.state.Narration
    };

    this.postData("api/users", data);
  };
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
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
    this.fetchSecurityGroups();
    this.fetchUsers();

    //this.fetchUsers();
  }
  componentWillMount() {}
  render() {
    // this.fetchUsers()
    console.log(this.state);
    const ColumnData = [
      {
        label: "UserName",
        field: "UserName",
        sort: "asc",
        width: 250
      },
      {
        label: "GroupCode",
        field: "GroupCode",
        sort: "asc",
        width: 270
      },
      {
        label: "Narration",
        field: "Narration",
        sort: "asc",
        width: 200
      }
    ];
    const Rowdata1 = [];
    const rows = [...this.state.usergroups];
    rows.map(function(k) {
      const Rowdata = {
        UserName: k.UserName,
        GroupCode: k.GroupCode,
        Narration: k.Narration
      };
      Rowdata1.push(Rowdata);
    });

    return (
      <Wrapper>
        <Breadcumps tablename={"User Groups"} />
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
                <form onSubmit={this.handleSubmit}>
                  <div className=' row'>
                    <div className='col-sm'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>UserName</label>
                        <select
                          className='form-control'
                          name='UserName'
                          onChange={this.handleInputChange}>
                          {this.state.Usersdata.map((user, i) => (
                            <option value={user.UserName} key={i}>
                              {user.UserName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>GroupCode</label>
                        <select name='GroupCode' className='form-control'>
                          {this.state.SecurityGroups.map(Group => (
                            <option
                              value={Group.GroupCode}
                              key={Group.GroupCode}
                              onChange={this.handleInputChange}>
                              {Group.GroupCode}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className='col-sm'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Narration</label>
                        <input
                          value={this.state.GroupCode}
                          type='text'
                          name='Narration'
                          // value={props.Values.Narration}
                          onChange={this.handleInputChange}
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='Narration'
                        />
                      </div>

                      <div className='form-group '>
                        <br />

                        <button
                          type='submit'
                          className='btn btn-primary'
                          style={{ margintop: 50 }}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <TableWrapper>
          <Table Rows={Rowdata1} columns={ColumnData} />
        </TableWrapper>
      </Wrapper>
    );
  }
}

export default UserGroups;
