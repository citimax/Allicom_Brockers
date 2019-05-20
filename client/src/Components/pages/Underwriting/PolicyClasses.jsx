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
      IsStandardPolicy: false,
      IsNegotiatedPolicy: false,
      Renewable: true,
      InsuranceCompany: "",
      STDPolicyNo: ""
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
      STDPolicyNo: "",
      IsStandardPolicy: false,
      IsNegotiatedPolicy: false
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
    const data = {
      PolicyCode: PolicyClass.PolicyCode,
      PolicyName: PolicyClass.PolicyName,
      Category: PolicyClass.Category,
      CommisionRate: PolicyClass.CommisionRate,
      AdminFee: PolicyClass.AdminFee,
      SpecificDates: PolicyClass.SpecificDates,
      Renewable: PolicyClass.Renewable,
      AllowMoreThan1Yr: PolicyClass.AllowMoreThan1Yr,
      InsuranceCompany: PolicyClass.InsuranceCompany,
      STDPolicyNo: PolicyClass.STDPolicyNo,
      SpecificDates: PolicyClass.SpecificDates,
      IsStandardPolicy: PolicyClass.IsStandardPolicy,
      IsNegotiatedPolicy: PolicyClass.IsNegotiatedPolicy,
      IsNegotiatedPolicy: PolicyClass.IsNegotiatedPolicy
    };
    this.setState(data);
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
      SpecificDates: this.state.SpecificDates,
      Renewable: this.state.Renewable,
      AllowMoreThan1Yr: this.state.AllowMoreThan1Yr,
      InsuranceCompany: this.state.InsuranceCompany.value,
      STDPolicyNo: this.state.STDPolicyNo,
      SpecificDates: this.state.SpecificDates,
      IsStandardPolicy: this.state.IsStandardPolicy,
      IsNegotiatedPolicy: this.state.IsNegotiatedPolicy
    };
    console.log(data);
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
        sort: "asc",
        width: 200
      },
      {
        label: "SpecificDates",
        field: "SpecificDates",
        sort: "asc",
        width: 200
      },
      {
        label: "Renewable",
        field: "Renewable",
        sort: "asc",
        width: 200
      },
      {
        label: "AllowMoreThan1Yr",
        field: "AllowMoreThan1Yr",
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
        label: "IsStandardPolicy",
        field: "IsStandardPolicy",
        sort: "asc"
      },
      {
        label: "IsNegotiatedPolicy",
        field: "IsNegotiatedPolicy",
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
          SpecificDates: k.SpecificDates.toString(),
          Renewable: k.Renewable.toString(),
          AllowMoreThan1Yr: k.AllowMoreThan1Yr.toString(),
          InsuranceCompany: k.InsuranceCompany,
          STDPolicyNo: k.STDPolicyNo,
          IsStandardPolicy: k.IsStandardPolicy.toString(),
          IsNegotiatedPolicy: k.IsNegotiatedPolicy.toString(),

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
                style={{ color: "#f44542" }}
                onClick={e => this.handleDelete(k.PolicyCode, e)}>
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
        </div>
      );
    }
  }
}

const Formdata = props => {
  const InsuranceCompaniesoptions = [...props.Values.InsuranceCompanies].map(
    (k, i) => {
      return {
        value: k.InsurerCode.toString(),
        label: k.InsurerName.toString()
      };
    }
  );
  const Categoryoptions = [...props.Values.PolicyCategories].map((k, i) => {
    return {
      value: k.Code.toString(),
      label: k.Name.toString()
    };
  });
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
                    <label htmlFor='PolicyCode'>PolicyCode</label>
                    <input
                      type='text'
                      name='PolicyCode'
                      value={props.Values.PolicyCode}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputRenewable1'
                      aria-describedby='emailHelp'
                      placeholder='Enter PolicyCode'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='InsuranceCompany'>Category</label>
                    <Select
                      name='Category'
                      className='form-group'
                      defaultInputValue={props.Values.Category}
                      value={props.Values.Category}
                      onChange={props.handleSelectChange}
                      options={Categoryoptions}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='AdminFee'>AdminFee (%)</label>
                    <input
                      type='number'
                      name='AdminFee'
                      value={props.Values.AdminFee}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter Admin Fee'
                      required
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='PolicyName'>PolicyName</label>
                    <input
                      type='text'
                      name='PolicyName'
                      checked={props.Values.PolicyName}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='PolicyName'
                      placeholder='PolicyName'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='CommisionRate'>CommisionRate (%)</label>
                    <input
                      type='number'
                      name='CommisionRate'
                      checked={props.Values.CommisionRate}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='CommisionRate'
                      placeholder='CommisionRate'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <p>Cover dates</p>
                    <div className='row'>
                      <div className='checkbox'>
                        <input
                          id='checkbox4'
                          type='checkbox'
                          name='Renewable'
                          onChange={props.handleInputChange}
                          checked={props.Values.Renewable}
                        />
                        <label htmlFor='checkbox4'>Renewable</label>
                      </div>
                      <div className='checkbox'>
                        <input
                          id='checkbox5'
                          type='checkbox'
                          name='AllowMoreThan1Yr'
                          onChange={props.handleInputChange}
                          checked={props.Values.AllowMoreThan1Yr}
                        />
                        <label htmlFor='checkbox1'>AllowMoreThan1Yr</label>
                      </div>

                      <div className='checkbox'>
                        <input
                          id='checkbox1'
                          type='checkbox'
                          name='SpecificDates'
                          onChange={props.handleInputChange}
                          checked={props.Values.SpecificDates}
                        />
                        <label htmlFor='checkbox1'>SpecificDates</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p />

              <span className='border-top'>
                <fieldset>
                  <p>Other policy details</p>

                  <div className='row'>
                    <div className='col-sm'>
                      <div className='form-group'>
                        <div className='checkbox'>
                          <input
                            id='checkbox3'
                            type='checkbox'
                            name='IsStandardPolicy'
                            onChange={props.handleInputChange}
                            checked={props.Values.IsStandardPolicy}
                          />
                          <label htmlFor='checkbox3'>Standard Policy</label>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='InsuranceCompany'>
                          Insurance Company
                        </label>
                        <Select
                          name='InsuranceCompany'
                          className='form-group'
                          defaultInputValue={props.Values.InsuranceCompany}
                          value={props.Values.InsuranceCompany}
                          onChange={props.handleSelectChange}
                          options={InsuranceCompaniesoptions}
                        />
                      </div>
                    </div>
                    <div className='col-sm'>
                      <div className='form-group'>
                        <div className='checkbox'>
                          <input
                            id='checkbox2'
                            type='checkbox'
                            name='IsNegotiatedPolicy'
                            onChange={props.handleInputChange}
                            checked={props.Values.IsNegotiatedPolicy}
                          />
                          <label htmlFor='checkbox2'>Negotiated Policy</label>
                        </div>
                      </div>

                      <div className='form-group'>
                        <label htmlFor='STDPolicyNo'>STDPolicyNo</label>
                        <input
                          type='text'
                          name='STDPolicyNo'
                          checked={props.Values.STDPolicyNo}
                          onChange={props.handleInputChange}
                          className='form-control'
                          id='STDPolicyNo'
                          placeholder='STDPolicyNo'
                          required
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </span>
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

export default PolicyClasses;
