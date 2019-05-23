import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class PolicyClasses extends Component {
  constructor() {
    super();
    this.state = {
      PolicyClasses: [],
      PolicyCategories: [],
      InsuranceCompanies: [],
      PolicyCode: "",
      PolicyName: "",
      Category: "",
      CommisionRate: "",
      AdminFee: "",
      SpecificDates: "",
      Email: "",
      AllowMoreThan1Yr: false,
      reseter: false,
      SpecificDates: false,
      Renewable: false,
      InsuranceCompany: "",
      STDPolicyNo: "",
      Coverdates: "",
      PolicyDetails: ""
    };
  }
  fetchInsuranceCompanies = () => {
    fetch("api/Insurer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ InsuranceCompanies: data });
        } else {
          swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  fetchPolicyCategories = () => {
    fetch("api/PolicyCategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ PolicyCategories: data });
        } else {
          swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  handleSelectChange = (County, actionMeta) => {
    this.setState({ [actionMeta.name]: County });
  };
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
      PolicyCode: "",
      PolicyName: "",
      Category: "",
      CommisionRate: "",
      AdminFee: "",
      SpecificDates: "",
      Renewable: "",
      AllowMoreThan1Yr: false,
      SpecificDates: false,
      InsuranceCompany: "",
      STDPolicyNo: ""
    });
  }
  fetchData = () => {
    fetch("api/PolicyClasses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PolicyClasses => {
        if (PolicyClasses.length > 0) {
          this.setState({ PolicyClasses: PolicyClasses });
        } else {
          swal("Oops!", PolicyClasses.message, "error");
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
  };
  handleDelete = k => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/PolicyClasses/" + k, {
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
  handleEdit = PolicyClass => {
    this.setState(PolicyClass);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      PolicyCode: this.state.PolicyCode,
      PolicyName: this.state.PolicyName,
      Category: this.state.Category.value,
      CommisionRate: this.state.CommisionRate,
      AdminFee: this.state.AdminFee,
      CoverDates: this.state.Coverdates.value,

      SpecificDates: this.state.SpecificDates,
      Renewable: this.state.Renewable,
      AllowMoreThan1Yr: this.state.AllowMoreThan1Yr,
      PolicyDetails: this.state.PolicyDetails.value,
      InsuranceCompany: this.state.InsuranceCompany.value,
      STDPolicyNo: this.state.STDPolicyNo
    };
    console.log("data", data);
    this.postData("/api/PolicyClasses", data);
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
    this.fetchPolicyCategories();
    this.fetchInsuranceCompanies();
  }

  render() {
    const ColumnData = [
      {
        label: "PolicyCode",
        field: "PolicyCode",
        sort: "asc",
        width: 250
      },
      {
        label: "PolicyName",
        field: "PolicyName",
        sort: "asc",
        width: 270
      },
      {
        label: "Category",
        field: "Category",
        sort: "asc",
        width: 200
      },
      {
        label: "CommisionRate",
        field: "CommisionRate",
        sort: "asc",
        width: 200
      },
      {
        label: "AdminFee",
        field: "AdminFee",
        sort: "asc"
      },
      {
        label: "CoverDates",
        field: "CoverDates",
        sort: "asc"
      },
      {
        label: "SpecificDates",
        field: "SpecificDates",
        sort: "asc"
      },
      {
        label: "Renewable",
        field: "Renewable",
        sort: "asc"
      },
      {
        label: "AllowMoreThan1Yr",
        field: "AllowMoreThan1Yr",
        sort: "asc"
      },
      {
        label: "PolicyDetails",
        field: "PolicyDetails",
        sort: "asc"
      },
      {
        label: "InsuranceCompany",
        field: "InsuranceCompany",
        sort: "asc"
      },
      {
        label: "STDPolicyNo",
        field: "STDPolicyNo",
        sort: "asc"
      },

      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];
    const Rows = [...this.state.PolicyClasses];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          PolicyCode: k.PolicyCode,
          PolicyName: k.PolicyName,
          Category: k.Category,
          CommisionRate: k.CommisionRate,
          AdminFee: k.AdminFee,
          CoverDates: k.CoverDates,

          Specificdates: k.Specificdates.toString(),
          Renewable: k.Renewable.toString(),
          AllowMoreThan1Yr: k.AllowMoreThan1Yr.toString(),

          PolicyDetails: k.PolicyDetails,
          InsuranceCompany: k.InsuranceCompany,
          STDPolicyNo: k.STDPolicyNo,

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
                onClick={e => this.handleDelete(k.PolicyCode, e)}
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
            tablename={"Policy classes"}
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
            PolicyCategories={this.state.PolicyCategories}
            InsuranceCompanies={this.state.InsuranceCompanies}
            handleSelectChange={this.handleSelectChange}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Breadcumps
            tablename={"Policy classes"}
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
const Negotiated = props => {
  const InsuranceCompaniesoptions = [...props.Values.InsuranceCompanies].map(
    (k, i) => {
      return {
        value: k.InsurerCode.toString(),
        label: k.InsurerName.toString()
      };
    }
  );

  if (props.Values.PolicyDetails.value == "Binder/Negotiated Policy") {
    return (
      <div className="">
        <div className="form-group">
          <label htmlFor="InsuranceCompany">Insurance Company</label>
          <Select
            name="InsuranceCompany"
            className="form-group"
            defaultInputValue={props.Values.InsuranceCompany}
            value={props.Values.InsuranceCompany}
            onChange={props.handleSelectChange}
            options={InsuranceCompaniesoptions}
          />
        </div>

        <div className="form-group">
          <label htmlFor="STDPolicyNo">STDPolicyNo</label>
          <input
            type="text"
            name="STDPolicyNo"
            defaultValue={props.Values.STDPolicyNo}
            onChange={props.handleInputChange}
            className="form-control"
            id="STDPolicyNo"
            placeholder="STDPolicy No"
          />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

const Specificdates = props => {
  if (props.Values.Coverdates.value == "Specific Dates") {
    return (
      <div className="form-group">
        <div className="checkbox">
          <input
            id="checkbox4"
            type="checkbox"
            name="Renewable"
            onChange={props.handleInputChange}
            defaultChecked={props.Values.Renewable}
          />
          <label htmlFor="checkbox4">Renewable</label>
        </div>
        <div className="checkbox">
          <input
            id="checkbox5"
            type="checkbox"
            name="AllowMoreThan1Yr"
            onChange={props.handleInputChange}
            defaultChecked={props.Values.AllowMoreThan1Yr}
          />
          <label htmlFor="checkbox1">Allow More Than 1Yr</label>
        </div>

        <div className="checkbox">
          <input
            id="checkbox1"
            type="checkbox"
            name="SpecificDates"
            onChange={props.handleInputChange}
            defaultChecked={props.Values.SpecificDates}
          />
          <label htmlFor="checkbox1">Specific Dates</label>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

const Formdata = props => {
  const Categoryoptions = [...props.Values.PolicyCategories].map((k, i) => {
    return {
      value: k.Code.toString(),
      label: k.Name.toString()
    };
  });
  const PolicyDetailsOptions = [
    {
      value: "Standard Policy",
      label: "Standard Policy"
    },
    {
      value: "Binder/Negotiated Policy",
      label: "Binder/Negotiated Policy"
    }
  ];
  const CoverdatesOptions = [
    {
      value: "Specific Dates",
      label: "Specific Dates"
    },
    {
      value: "No Specific Dates",
      label: "No Specific Dates"
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
                    <label htmlFor="PolicyCode">PolicyCode</label>
                    <input
                      type="text"
                      name="PolicyCode"
                      value={props.Values.PolicyCode}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputRenewable1"
                      aria-describedby="emailHelp"
                      placeholder="Enter PolicyCode"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="PolicyName">PolicyName</label>
                    <input
                      type="text"
                      name="PolicyName"
                      value={props.Values.PolicyName}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="PolicyName"
                      placeholder="PolicyName"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="InsuranceCompany">Category</label>
                    <Select
                      name="Category"
                      className="form-group"
                      defaultInputValue={props.Values.Category}
                      value={props.Values.Category}
                      onChange={props.handleSelectChange}
                      options={Categoryoptions}
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="CommisionRate">CommisionRate (%)</label>
                    <input
                      type="number"
                      name="CommisionRate"
                      value={props.Values.CommisionRate}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="CommisionRate"
                      placeholder="CommisionRate"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="AdminFee">AdminFee (%)</label>
                    <input
                      type="number"
                      name="AdminFee"
                      value={props.Values.AdminFee}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Admin Fee"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="PolicyDetails">Policy Details</label>
                    <Select
                      name="PolicyDetails"
                      defaultInputValue={props.Values.PolicyDetails}
                      value={props.Values.PolicyDetails}
                      onChange={props.handleSelectChange}
                      options={PolicyDetailsOptions}
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="Coverdates">Cover dates</label>
                    <Select
                      name="Coverdates"
                      value={props.Values.Coverdates}
                      defaultInputValue={props.Values.Coverdates}
                      onChange={props.handleSelectChange}
                      options={CoverdatesOptions}
                    />
                  </div>
                  <div className="form-group">
                    <Specificdates
                      Values={props.Values}
                      handleInputChange={props.handleInputChange}
                    />
                  </div>

                  <Negotiated
                    Values={props.Values}
                    handleSelectChange={props.handleSelectChange}
                    handleInputChange={props.handleInputChange}
                  />
                </div>
              </div>
              <p />

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

export default PolicyClasses;
