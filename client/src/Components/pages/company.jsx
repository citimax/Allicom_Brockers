import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class Company extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      CountyData: {},
      reseter: false,
      CompCode: "001",
      CompName: "0",
      Telephone: "0",
      Fax: "0",
      Email: "0",
      Website: "0",
      PostalAddress: "0",
      Street: "0",
      Country: "KE",
      County: "UG",
      PINNo: "0",
      NHIFNo: "0",
      NSSFNo: "0",
      Logo: null,
      BaseCurr: "KES"
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
      CompCode: "001",
      CompName: "0",
      Telephone: "0",
      Fax: "0",
      Email: "0",
      Website: "0",
      PostalAddress: "0",
      Street: "0",
      Country: "KE",
      County: "UG",
      PINNo: "0",
      NHIFNo: "0",
      NSSFNo: "0",
      Logo: null,
      BaseCurr: "KES"
    });
  }
  fetchData = () => {
    fetch("api/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(company => {
        if (company.length > 0) {
          this.setState({ company: company });
        } else {
          swal("Oops!", company.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  fetchCounty = () => {
    fetch("api/Counties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(county => {
        if (county.length > 0) {
                  this.setState({ CountyData: county });
        } else {
          swal("Oops!", county.message, "error");
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

  handleSelectChange = County => {
    this.setState({ County });
  };
  handleDelete = company => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/company/" + company.CompCode, {
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
  handleEdit = company => {
    const data = {
      CompCode: company.CompCode,
      CompName: company.CompName,
      Telephone: company.Telephone,
      Fax: company.Fax,
      Email: company.Email,
      Website: company.Website,
      PostalAddress: company.PostalAddress,
      Street: company.Street,
      Country: company.Country,
      County: company.County,
      PINNo: company.PINNo,
      NHIFNo: company.NHIFNo,
      NSSFNo: company.NSSFNo,
      Logo: company.Logo,
      BaseCurr: company.BaseCurr
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      CompCode: this.state.CompCode,
      CompName: this.state.CompName,
      Telephone: this.state.Telephone,
      Fax: this.state.Fax,
      Email: this.state.Email,
      Website: this.state.Website,
      PostalAddress: this.state.PostalAddress,
      Street: this.state.Street,
      Country: this.state.Country,
      County: this.state.County,
      PINNo: this.state.PINNo,
      NHIFNo: this.state.NHIFNo,
      NSSFNo: this.state.NSSFNo,
      // Logo: this.state.Logo,
      BaseCurr: this.state.BaseCurr
    };

    this.postData("api/company", data);
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
    this.fetchCounty();
  }
  componentDidUpdate() {
    this.fetchCounty();
  }
  render() {
    const ColumnData = [
      {
        label: "CompCode",
        field: "CompCode",
        sort: "asc",
        width: 250
      },
      {
        label: "CompName",
        field: "CompName",
        sort: "asc",
        width: 270
      },
      {
        label: "Telephone",
        field: "Telephone",
        sort: "asc",
        width: 200
      },
      {
        label: "Fax",
        field: "Fax",
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
        label: "Website",
        field: "Website",
        sort: "asc",
        width: 200
      },
      {
        label: "PostalAddress",
        field: "PostalAddress",
        sort: "asc",
        width: 200
      },
      {
        label: "Street",
        field: "Street",
        sort: "asc",
        width: 200
      },
      {
        label: "Country",
        field: "Country",
        sort: "asc",
        width: 200
      },
      {
        label: "County",
        field: "County",
        sort: "asc",
        width: 200
      },
      {
        label: "PINNo",
        field: "PINNo",
        sort: "asc",
        width: 200
      },
      {
        label: "NHIFNo",
        field: "NHIFNo",
        sort: "asc",
        width: 200
      },
      {
        label: "NSSFNo",
        field: "NSSFNo",
        sort: "asc",
        width: 200
      },
      {
        label: "BaseCurr",
        field: "BaseCurr",
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
    const Rows = [...this.state.company];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          CompCode: k.CompCode,
          CompName: k.CompName,
          Telephone: k.Telephone,
          Fax: k.Fax,
          Email: k.Email,
          Website: k.Website,
          PostalAddress: k.PostalAddress,
          Street: k.Street,
          Country: k.Country,
          County: k.County,
          PINNo: k.PINNo,
          NHIFNo: k.NHIFNo,
          NSSFNo: k.NSSFNo,
          BaseCurr: k.BaseCurr,
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
            tablename={"Add Company"}
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
            handleSelectChange={this.handleSelectChange}
            CountyData={this.state.CountyData}
          />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Breadcumps
            tablename={"Company list"}
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
  let CountyData = [...props.CountyData];
  const options = CountyData.map((k, i) => {
    return {
      value: k.CountyCode.toString(),
      label: k.CountyName.toString()
    };
  });
  console.log(options);
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
                    <label htmlFor='CompCode'>CompCode</label>
                    <input
                      type='text'
                      name='CompCode'
                      value={props.Values.CompCode}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter CompCode'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Telephone</label>
                    <input
                      type='text'
                      name='Telephone'
                      required
                      value={props.Values.Telephone}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Telephone'
                      aria-describedby='TelephoneHelp'
                      placeholder='Enter Telephone'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Email</label>
                    <input
                      type='email'
                      name='Email'
                      required
                      value={props.Values.Email}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Email'
                      aria-describedby='EmailHelp'
                      placeholder='Enter Email'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='PostalAddress'>PostalAddress</label>
                    <input
                      type='text'
                      name='PostalAddress'
                      required
                      value={props.Values.PostalAddress}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='PostalAddress'
                      aria-describedby='PostalAddressHelp'
                      placeholder='Enter PostalAddress'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Country'>Country</label>
                    <Select
                      name='Country'
                      value={props.Values.Country}
                      onChange={props.handleSelectChange}
                      placeholder='Enter Country'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='PINNo'>PINNo</label>
                    <input
                      type='text'
                      name='PINNo'
                      required
                      value={props.Values.PINNo}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='PINNo'
                      aria-describedby='PINNoHelp'
                      placeholder='Enter PINNo'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='NSSFNo'>NSSFNo</label>
                    <input
                      type='text'
                      name='NSSFNo'
                      required
                      value={props.Values.NSSFNo}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='NSSFNo'
                      aria-describedby='NSSFNoHelp'
                      placeholder='Enter NSSFNo'
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='CompName'>CompName</label>
                    <input
                      type='text'
                      name='CompName'
                      value={props.Values.CompName}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='CompName'
                      placeholder='CompName'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Fax'>Fax</label>
                    <input
                      type='text'
                      name='Fax'
                      value={props.Values.Fax}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Fax'
                      placeholder='Fax'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Website'>Website</label>
                    <input
                      type='text'
                      name='Website'
                      value={props.Values.Website}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Website'
                      placeholder='Website'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Street'>Street</label>
                    <input
                      type='text'
                      name='Street'
                      onChange={props.handleInputChange}
                      value={props.Values.Street}
                      className='form-control'
                      id='Street'
                      aria-describedby='emailHelp'
                      placeholder='Street'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='County'>County</label>
                    <Select
                      name='County'
                      value={props.Values.County}
                      onChange={props.handleSelectChange}
                      options={options}
                      placeholder='Enter County'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='NHIFNo'>NHIFNo</label>
                    <input
                      type='text'
                      name='NHIFNo'
                      required
                      value={props.Values.NHIFNo}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='NHIFNo'
                      aria-describedby='NHIFNoHelp'
                      placeholder='Enter NHIFNo'
                    />
                  </div>
                  <div>
                    <label htmlFor='BaseCurr'>BaseCurr</label>
                    <Select
                      name='BaseCurr'
                      value={props.Values.BaseCurr}
                      onChange={props.handleSelectChange}
                      placeholder='Enter BaseCurr'
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

export default Company;
