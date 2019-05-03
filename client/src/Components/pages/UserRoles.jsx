import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import swal from "sweetalert";

class UserRoles extends Component {
  constructor() {
    super();
    this.state = {
      UserRoles: [],
      UserGroup: "Admin",
      SecurityModule: "company",
      View: true,
      Add: true,
      Edit: true,
      Delete: true,
      Export: true,
      Import: true,
      ExpiryDate: "4/25/2099"
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
      UserGroup: "Admin",
      SecurityModule: "company",
      View: true,
      Add: true,
      Edit: false,
      Delete: true,
      Export: true,
      Import: true,
      ExpiryDate: "4/25/2099"
    });
  }
  fetchData = () => {
    fetch("api/userRoles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(UserRoles => {
        if (UserRoles.length > 0) {
          this.setState({ UserRoles: UserRoles });
        } else {
          swal("Oops!", UserRoles.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  handleInputChange = event => {
    event.preventDefault();

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
    console.log(value);
  };
  handleDelete = User => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch(
          "api/userRoles/" + User.username + "/" + User.SecurityModule,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
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
  handleEdit = UserRole => {
    const data = {
      UserGroup: UserRole.UserGroup,
      SecurityModule: UserRole.SecurityModule,
      View: UserRole.View.toString(),
      Add: UserRole.Add,
      Edit: UserRole.Edit,
      Delete: UserRole.Delete,
      Export: UserRole.Export,
      Import: UserRole.Import,
      ExpiryDate: UserRole.ExpiryDate
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      UserGroup: this.state.UserGroup,
      SecurityModule: this.state.SecurityModule,
      View: this.state.View,
      Add: this.state.Add,
      Edit: this.state.Edit,
      Delete: this.state.Delete,
      Export: this.state.Export,
      Import: this.state.Import,
      ExpiryDate: this.state.ExpiryDate
    };

    this.postData("api/userRoles", data);
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
        label: "UserGroup",
        field: "UserGroup",
        sort: "asc",
        width: 250
      },
      {
        label: "SecurityModule",
        field: "SecurityModule",
        sort: "asc",
        width: 270
      },
      {
        label: "View",
        field: "View",
        sort: "asc",
        width: 200
      },
      {
        label: "Add",
        field: "Add",
        sort: "asc",
        width: 200
      },
      {
        label: "Edit",
        field: "Edit",
        sort: "asc",
        width: 200
      },
      {
        label: "Delete",
        field: "Delete",
        sort: "asc",
        width: 200
      },
      {
        label: "Export",
        field: "Export",
        sort: "asc",
        width: 200
      },
      {
        label: "Import",
        field: "Import",
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
    const Rows = [...this.state.UserRoles];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          UserGroup: k.UserGroup,
          SecurityModule: k.SecurityModule,
          View: k.View.toString(),
          Add: k.Add.toString(),
          Edit: k.Edit.toString(),
          Delete: k.Delete.toString(),
          Export: k.Export.toString(),
          Import: k.Import.toString(),
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
                onClick={e => this.handleDelete(k, e)}>
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
            tablename={"User Roles"}
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
            tablename={"User Roles"}
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
                    <label htmlFor='Username'>UserGroup</label>
                    <input
                      type='text'
                      name='UserGroup'
                      value={props.Values.UserGroup}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter UserGroup'
                      required
                    />
                  </div>
                  <div className='checkbox'>
                    <input
                      id='View'
                      type='checkbox'
                      name='View'
                      onChange={props.handleInputChange}
                      checked={props.Values.View}
                    />
                    <label htmlFor='View'>View</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='Add'
                      type='checkbox'
                      name='Add'
                      onChange={props.handleInputChange}
                      checked={props.Values.Add}
                    />
                    <label htmlFor='Add'>Add</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='Edit'
                      type='checkbox'
                      name='Edit'
                      onChange={props.handleInputChange}
                      checked={props.Values.Edit}
                    />
                    <label htmlFor='Edit'>Edit</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='Delete'
                      type='checkbox'
                      name='Delete'
                      onChange={props.handleInputChange}
                      checked={props.Values.Delete}
                    />
                    <label htmlFor='Delete'>Delete</label>
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='SecurityModule'>SecurityModule</label>
                    <input
                      type='text'
                      name='SecurityModule'
                      checked={props.Values.SecurityModule}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='SecurityModule'
                      placeholder='SecurityModule'
                      required
                    />
                  </div>
                  <div className='form-group' id='data_1'>
                    <label className='font-normal'>ExpiryDate</label>
                    <div className='input-group date'>
                      <span className='input-group-addon'>
                        <i className='fa fa-calendar' />
                      </span>
                      <input
                        name='ExpiryDate'
                        type='date'
                        onChange={props.handleInputChange}
                        defaultValue={props.Values.ExpiryDate}
                        className='form-control'
                      />
                    </div>
                  </div>

                  <div className='checkbox'>
                    <input
                      id='Export'
                      type='checkbox'
                      name='Export'
                      onChange={props.handleInputChange}
                      checked={props.Values.Export}
                    />
                    <label htmlFor='Export'>Export</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='Import'
                      type='checkbox'
                      name='Import'
                      onChange={props.handleInputChange}
                      checked={props.Values.Import}
                    />
                    <label htmlFor='Import'>Import</label>
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

export default UserRoles;
