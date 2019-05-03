import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import swal from "sweetalert";
class UserGroups extends Component {
  constructor() {
    super();
    this.state = {
      reseter: false,
      usergroups: [],
      Usersdata: [],
      SecurityGroups: [],
      UserName: "",
      GroupCode: "",
      Narration: ""
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
  handleDelete = k => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/Usergroups/" + k.UserName + "/" + k.GroupCode, {
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
      GroupCode: User.GroupCode,
      Narration: User.Narration
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
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

    this.postData("api/Usergroups", data);
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  postData(url = ``, data = {}) {
    fetch(url, {
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

  render() {
    // this.fetchUsers()

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
      },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];

    const Rowdata1 = [];
    const rows = [...this.state.usergroups];
    if (rows.length > 0) {
      rows.map((k, i) => {
        const Rowdata = {
          UserName: k.UserName,
          GroupCode: k.GroupCode,
          Narration: k.Narration,
          action: (
            <span>
              {" "}
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.handleEdit(k, e)}
              >
                Edit
              </a>
              |{" "}
              <a
                style={{ color: "#f44542" }}
                onClick={e => this.handleDelete(k, e)}
              >
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
            tablename={"User Groups"}
            button={
              <button
                to="/"
                type="button"
                style={{ marginTop: 40 }}
                onClick={this.handleclick}
                className="btn btn-primary float-left"
              >
                Go Back
              </button>
            }
          />

          <Formdata
            Values={this.state}
            handleSubmit={this.handleSubmit}
            Usersdata={this.state.Usersdata}
            SecurityGroups={this.state.SecurityGroups}
            handleInputChange={this.handleInputChange}
          />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Breadcumps
            tablename={"User Groups"}
            button={
              <button
                to="/"
                type="button"
                style={{ marginTop: 40 }}
                onClick={this.handleclick}
                className="btn btn-primary float-left"
              >
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
    <div className="container-fluid">
      <div className="col-sm-12">
        <div className="ibox ">
          <div className="ibox-title">
            <div className="ibox-tools">
              <a className="close-link">
                <i className="fa fa-times" />
              </a>
            </div>
          </div>
          <div className="ibox-content">
            <form onSubmit={props.handleSubmit}>
              <div className=" row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">UserName</label>
                    <select
                      className="form-control"
                      name="UserName"
                      value={props.Values.UserName}
                      onChange={props.handleInputChange}
                    >
                      {props.Usersdata.map((user, i) => (
                        <option key={i}>{user.UserName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">GroupCode</label>
                    <select
                      className="form-control"
                      name="GroupCode"
                      value={props.Values.GroupCode}
                      onChange={props.handleInputChange}
                    >
                      {props.SecurityGroups.map(Group => (
                        <option key={Group.GroupCode}>{Group.GroupCode}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Narration</label>
                    <textarea
                      value={props.Values.Narration}
                      type="text"
                      name="Narration"
                      // value={props.Values.Narration}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Narration"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <br />

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserGroups;
