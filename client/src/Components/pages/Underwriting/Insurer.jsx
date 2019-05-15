import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";

class InsuranceCompanies extends Component {
  constructor() {
    super();
    this.state = {
      InsuranceCompanies: [],
      InsurerCode: "",
      InsurerName: "",
      Address: "",
      City: "",
      Telephone: "",
      Mobile: "",
      Email: "",
      Rate: "",
      Active: true
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
      InsurerCode: "",
      InsurerName: "",
      Address: "",
      City: "",
      Telephone: "",
      Mobile: "",
      Email: "",
      Rate: "",
      Active: true
    });
  }
  fetchData = () => {
    fetch("api/Insurer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(InsuranceCompanies => {
        if (InsuranceCompanies.length > 0) {
          this.setState({ InsuranceCompanies: InsuranceCompanies });
        } else {
          swal("Oops!", InsuranceCompanies.message, "error");
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
  handleDelete = k => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/Insurer/" + k, {
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
  handleEdit = Insurer => {
    const data = {
      InsurerCode: Insurer.InsurerCode,
      InsurerName: Insurer.InsurerName,
      Address: Insurer.Address,
      City: Insurer.City,
      Telephone: Insurer.Telephone,
      Mobile: Insurer.Mobile,
      Email: Insurer.Email,
      Rate: Insurer.Rate,
      Active: Insurer.Active
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      InsurerCode: this.state.InsurerCode,
      InsurerName: this.state.InsurerName,
      Address: this.state.Address,
      City: this.state.City,
      Telephone: this.state.Telephone,
      Mobile: this.state.Mobile,
      Email: this.state.Email,
      Rate: this.state.Rate,
      Active: this.state.Active
    };
    console.log(data);
    this.postData("/api/Insurer", data);
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
        label: "InsurerCode",
        field: "InsurerCode",
        sort: "asc",
        width: 250
      },
      {
        label: "InsurerName",
        field: "InsurerName",
        sort: "asc",
        width: 270
      },
      {
        label: "Address",
        field: "Address",
        sort: "asc",
        width: 200
      },
      {
        label: "City",
        field: "City",
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
        label: "Mobile",
        field: "Mobile",
        sort: "asc",
        width: 200
      },
      {
        label: "Email",
        field: "Email",
        sort: "asc",
        width: 200
      },
      {
        label: "Rate",
        field: "Rate",
        sort: "asc",
        width: 200
      },
      {
        label: "Active",
        field: "Active",
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
    const Rows = [...this.state.InsuranceCompanies];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          InsurerCode: k.InsurerCode,
          InsurerName: k.InsurerName,
          Address: k.Address,
          City: k.City,
          Telephone: k.Telephone,
          Mobile: k.Mobile,
          Email: k.Email,
          Rate: k.Rate,
          Active: k.Active.toString(),
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
                onClick={e => this.handleDelete(k.InsurerCode, e)}
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
            tablename={"Insurance Companies"}
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
            tablename={"Insurance Companies"}
            button={
              <button
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
                    <label htmlFor="InsurerCode">InsurerCode</label>
                    <input
                      type="text"
                      name="InsurerCode"
                      value={props.Values.InsurerCode}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter UserGroup"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="InsurerCode">Address</label>
                    <input
                      type="text"
                      name="Address"
                      value={props.Values.Address}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Telephone">Telephone</label>
                    <input
                      type="text"
                      name="Telephone"
                      value={props.Values.Telephone}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Telephone"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="text"
                      name="Email"
                      value={props.Values.Email}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="InsurerName">InsurerName</label>
                    <input
                      type="text"
                      name="InsurerName"
                      checked={props.Values.InsurerName}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="InsurerName"
                      placeholder="InsurerName"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="City">City</label>
                    <input
                      type="text"
                      name="City"
                      checked={props.Values.City}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="City"
                      placeholder="City"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Mobile">Mobile</label>
                    <input
                      type="text"
                      name="Mobile"
                      checked={props.Values.Mobile}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="Mobile"
                      placeholder="Mobile"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Rate">Rate (%)</label>
                    <input
                      type="number"
                      name="Rate"
                      checked={props.Values.Rate}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="Rate"
                      placeholder="Rate"
                      required
                    />
                  </div>
                  <div className="checkbox">
                    <input
                      id="Active"
                      type="checkbox"
                      name="Active"
                      onChange={props.handleInputChange}
                      checked={props.Values.Import}
                    />
                    <label htmlFor="Active">Active</label>
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

export default InsuranceCompanies;
