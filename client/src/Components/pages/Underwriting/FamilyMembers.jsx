import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";
//import { js } from "./bootstrap";

class FamilyMember extends Component {
  constructor() {
    super();
    this.state = {
      FamilyMember: [],
      MemberCode: "",
      Names: "",
      Family: "",
      DOB: "",
      Gender: "",
      Address: "",
      Mobile: "",
      Telephone: "",
      Email: "",
      Town: "",
      Agent: "",
      IDNO: "",
      PassportNo: ""
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
      MemberCode: "",
      Names: "",
      Family: "",
      DOB: "",
      Gender: "",
      Address: "",
      Mobile: "",
      Telephone: "",
      Mobile: "",
      Email: "",
      IDNO: "",
      PassportNo: ""
    });
  }
  fetchData = () => {
    fetch("api/FamilyMembers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(FamilyMember => {
        if (FamilyMember.length > 0) {
          this.setState({ FamilyMember });
        } else {
          swal("Oops!", FamilyMember.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  handleInputChange = event => {
    // event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSelectChange = (data, actionMeta) => {
    this.setState({ [actionMeta.name]: data });
  };

  handleDelete = FamilyMember => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/FamilyMembers/" + FamilyMember.MemberCode, {
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
  handleEdit = FamilyMember => {
    const data = {
      MemberCode: FamilyMember.MemberCode,
      Names: FamilyMember.Names,
      Family: FamilyMember.Family,
      DOB: FamilyMember.DOB,
      Gender: FamilyMember.Gender,
      Address: FamilyMember.Address,
      Mobile: FamilyMember.Mobile,
      Telephone: FamilyMember.Telephone,
      Mobile: FamilyMember.Mobile,
      Email: FamilyMember.Email,
      Town: FamilyMember.Town,
      IDNO: FamilyMember.IDNO,
      PassportNo: FamilyMember.PassportNo
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Names: this.state.Names,
      Family: this.state.Family,
      DOB: this.state.DOB,
      Gender: this.state.Gender.value,
      Address: this.state.Address,
      Mobile: this.state.Mobile,
      Telephone: this.state.Telephone,
      Email: this.state.Email,
      Town: this.state.Town,
      IDNO: this.state.IDNO,
      PassoortNo: this.state.PassportNo
    };

    this.postData("api/FamilyMembers", data);
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

          if (data.success) {
            this.handleStateReset();
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
        label: "MemberCode",
        field: "MemberCode",
        sort: "asc",
        width: 250
      },
      {
        label: "Names",
        field: "Names",
        sort: "asc",
        width: 250
      },

      {
        label: "Family",
        field: "Family",
        sort: "asc",
        width: 200
      },
      {
        label: "DOB",
        field: "DOB",
        sort: "asc",
        width: 200
      },
      {
        label: "Gender",
        field: "Gender",
        sort: "asc",
        width: 200
      },
      {
        label: "Address",
        field: "Address",
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
        label: "Telephone",
        field: "Telephone",
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
        label: "Town",
        field: "Town",
        sort: "asc",
        width: 200
      },

      {
        label: "IDNO",
        field: "IDNO",
        sort: "asc",
        width: 200
      },
      {
        label: "PassportNo",
        field: "PassportNo",
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
    const Rows = [...this.state.FamilyMember];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          MemberCode: k.MemberCode,

          Names: k.Names,
          Family: k.Family,
          DOB: k.DOB,
          Gender: k.Gender,
          Address: k.Address,
          Mobile: k.Mobile,
          Telephone: k.Telephone,

          Email: k.Email,

          Town: k.Town,

          IDNO: k.IDNO,
          PassportNo: k.PassoortNo,

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
        <div>
          <Breadcumps
            tablename={"Add FamilyMember"}
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
            handleSelectChange={this.handleSelectChange}
            Collections={this.state}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Breadcumps
            tablename={"FamilyMember list"}
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
        </div>
      );
    }
  }
}
const Formdata = props => {
  const GenderOptions = [
    {
      value: "Male",
      label: "Male"
    },
    {
      value: "Female",
      label: "Female"
    }
  ];
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
                    <label htmlFor="Names">Names</label>
                    <input
                      type="text"
                      name="Names"
                      required
                      value={props.Values.Names}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="Names"
                      aria-describedby="NamesHelp"
                      placeholder="Enter names"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="DOB">DOB</label>
                    <input
                      type="date"
                      name="DOB"
                      required
                      value={props.Values.DOB}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="DOB"
                      aria-describedby="DOBHelp"
                      placeholder="Enter DOB"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Gender">Gender</label>
                    <Select
                      name="Gender"
                      value={props.Values.Gender}
                      onChange={props.handleSelectChange}
                      options={GenderOptions}
                      defaultInputValue={props.Values.Gender}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Address">Address</label>
                    <input
                      className="form-control"
                      name="Address"
                      value={props.Values.Address}
                      onChange={props.handleInputChange}
                      placeholder="Enter Address"
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="Family">Family</label>
                    <input
                      type="text"
                      name="Family"
                      value={props.Values.Family}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="Family"
                      placeholder="Family"
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
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Mobile">Mobile</label>
                    <input
                      type="text"
                      name="Mobile"
                      onChange={props.handleInputChange}
                      value={props.Values.Mobile}
                      className="form-control"
                      id="Mobile"
                      aria-describedby="emailHelp"
                      placeholder="Mobile"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                      type="text"
                      name="Email"
                      onChange={props.handleInputChange}
                      value={props.Values.Email}
                      className="form-control"
                      id="Email"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="IDNO">Contact Person</label>
                    <input
                      type="text"
                      name="IDNO"
                      required
                      value={props.Values.IDNO}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="IDNO"
                      aria-describedby="IDNOHelp"
                      placeholder="Enter IDNO"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="PassportNo">PassportNo</label>
                    <input
                      type="text"
                      name="PassportNo"
                      onChange={props.handleInputChange}
                      value={props.Values.PassportNo}
                      className="form-control"
                      id="PassportNo"
                      aria-describedby="PassportNoHelp"
                      placeholder="PassportNo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Town">Town</label>
                    <input
                      type="text"
                      name="Town"
                      required
                      value={props.Values.Town}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="Town"
                      aria-describedby="TownHelp"
                      placeholder="Enter Town"
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

export default FamilyMember;
