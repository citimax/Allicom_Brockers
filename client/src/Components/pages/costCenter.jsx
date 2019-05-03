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
      CostCenters: [],

      CCCode: "",
      CCName: "",
      CompCode: "",
      Mobile: "",
      PostalAddress: "",
      PhysicalAddress: "",
      WebUrl: "",
      Status: true,
      Email: "",
      Telephone: ""
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

  handleEdit = k => {
    const data = {
      CCCode: k.CCCode,
      CCName: k.CCName,
      CompCode: k.CompCode,
      PhysicalAddress: k.PhysicalAddress,
      WebUrl: k.WebUrl,
      Status: k.Status,
      CompCode: k.CompCode,
      Mobile: k.Mobile,
      PostalAddress: k.PostalAddress,
      Email: k.Email,
      Telephone: k.Telephone
    };
    console.log(data);
    this.setState(data);
    this.setState({ reseter: true });
  };

  fetchData = () => {
    fetch("/api/CostCenter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ CostCenters: data });
        } else {
          swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
        swal("Oops!, data.message, error");
      });
  };
  handleDelete = k => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/CostCenter/" + k, {
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

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      CCCode: this.state.CCCode,
      CCName: this.state.CCName,
      CompCode: this.state.CompCode,
      PhysicalAddress: this.state.PhysicalAddress,
      WebUrl: this.state.WebUrl,
      Status: this.state.Status,
      PostalAddress: this.state.PostalAddress,
      Mobile: this.state.Mobile,
      Email: this.state.Email,
      Telephone: this.state.Telephone
    };

    this.postData("/api/CostCenter", data);
  };

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
  }

  render() {
    const ColumnData = [
      {
        label: "CCCode",
        field: "CCCode",
        sort: "asc",
        width: 270
      },
      {
        label: "CCName",
        field: "CCName",
        sort: "asc",
        width: 250
      },
      {
        label: "CompCode",
        field: "CompCode",
        sort: "asc",
        width: 250
      },
      {
        label: "Mobile",
        field: "Mobile",
        sort: "asc",
        width: 250
      },
      {
        label: "Telephone",
        field: "Telephone",
        sort: "asc",
        width: 250
      },
      {
        label: "Email",
        field: "Email",
        sort: "asc",
        width: 250
      },
      {
        label: "PostalAddress",
        field: "PostalAddress",
        sort: "asc",
        width: 250
      },
      {
        label: "PhysicalAddress",
        field: "PhysicalAddress",
        sort: "asc",
        width: 250
      },
      {
        label: "WebUrl",
        field: "WebUrl",
        sort: "asc",
        width: 250
      },
      {
        label: "Status",
        field: "Status",
        sort: "asc",
        width: 250
      },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];

    const Rowdata1 = [];
    const rows = [...this.state.CostCenters];
    if (rows.length > 0) {
      rows.map((k, i) => {
        const Rowdata = {
          CCCode: k.CCCode,
          CCName: k.CCName,
          CompCode: k.CompCode,
          Mobile: k.Mobile,
          Telephone: k.Telephone,
          Email: k.Email,
          PostalAddress: k.PostalAddress,
          PhysicalAddress: k.PhysicalAddress,
          WebUrl: k.WebUrl,
          Status: k.Status.toString(),
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
                onClick={e => this.handleDelete(k.CCCode, e)}
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
            tablename={"CostCenter"}
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
            handleInputChange={this.handleInputChange}
          />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Breadcumps
            tablename={"CostCenter"}
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
                    <label htmlFor="CCCode">CostCenter Code</label>
                    <input
                      type="text"
                      name="CCCode"
                      value={props.Values.CCCode}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="CCCode1"
                      aria-describedby="emailHelp"
                      placeholder="Enter CCCode"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="CCCode">CostCenter Name</label>
                    <input
                      type="text"
                      name="CCName"
                      value={props.Values.CCName}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="CCName"
                      aria-describedby="emailHelp"
                      placeholder="Enter CCName"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Mobile">Mobile</label>
                    <input
                      name="Mobile"
                      type="text"
                      value={props.Values.Mobile}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Mobile"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="CompCode">CompCode</label>
                    <input
                      type="text"
                      name="CompCode"
                      value={props.Values.CompCode}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="CompCode"
                      aria-describedby="emailHelp"
                      placeholder="Enter CompCode"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      name="Email"
                      value={props.Values.Email}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="Email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="FullNames">PostalAddress</label>
                    <input
                      type="text"
                      name="PostalAddress"
                      value={props.Values.PostalAddress}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="PostalAddress"
                      placeholder="PostalAddress"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="PhysicalAddress">PhysicalAddress</label>
                    <input
                      type="text"
                      name="PhysicalAddress"
                      value={props.Values.PhysicalAddress}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="PhysicalAddress"
                      aria-describedby="emailHelp"
                      placeholder="Enter PhysicalAddress"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Telephone">Telephone</label>
                    <input
                      type="text"
                      name="Telephone"
                      value={props.Values.Telephone}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="Telephone"
                      placeholder="Telephone"
                      required
                    />
                  </div>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="Status"
                      checked={props.Values.Status}
                      onChange={props.handleInputChange}
                      id="Status"
                    />
                    <label htmlFor="Status">Active Status</label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="ConfirmPassword">WebUrl</label>
                    <input
                      type="text"
                      name="WebUrl"
                      value={props.Values.WebUrl}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="WebUrl"
                      aria-describedby="emailHelp"
                      placeholder="WebUrl"
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
