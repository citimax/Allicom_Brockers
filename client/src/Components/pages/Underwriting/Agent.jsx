import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";

class Agent extends Component {
  constructor() {
    super();
    this.state = {
      agents: [],
      CostCenter: "",
      AgentCode: "",
      AgentName: "",
      AgentAddress: "",
      City: "",
      Telephone: "",
      Mobile: "",
      Email: "",
      Occupation: "",
      ContactPerson: "",
      Group: ""
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
      CostCenter: "001",
      AgentCode: "A001",
      AgentName: "steve",
      AgentAddress: "Nairobi",
      City: "Nairobi",
      Telephone: "0",
      Mobile: "0",
      Email: "email@email.com",
      Occupation: "Occupation",
      ContactPerson: "0",
      Group: "0"
    });
  }
  fetchData = () => {
    fetch("api/agents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(agents => {
        if (agents.length > 0) {
          this.setState({ agents });
        } else {
          swal("Oops!", agents.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  //   fetchCounty = () => {
  //     fetch("api/Counties", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token")
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(county => {
  //         if (county.length > 0) {
  //           this.setState({ CountyData: county });
  //         } else {
  //           swal("Oops!", county.message, "error");
  //         }
  //       })
  //       .catch(err => {
  //         swal("Oops!", err.message, "error");
  //       });
  //   };

  //   fetchCountries = () => {
  //     fetch("api/Countries", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token")
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(CountryData => {
  //         if (CountryData.length > 0) {
  //           this.setState({ CountryData: CountryData });
  //         } else {
  //           swal("Oops!", CountryData.message, "error");
  //         }
  //       })
  //       .catch(err => {
  //         swal("Oops!", err.message, "error");
  //       });
  //   };

  //   fetchCurrency = () => {
  //     fetch("api/currency", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token")
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(CurrencyData => {
  //         if (CurrencyData.length > 0) {
  //           this.setState({ CurrencyData: CurrencyData });
  //         } else {
  //           swal("Oops!", CurrencyData.message, "error");
  //         }
  //       })
  //       .catch(err => {
  //         swal("Oops!", err.message, "error");
  //       });
  //   };

  handleInputChange = event => {
    // event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSelectChange = (County, actionMeta) => {
    this.setState({ [actionMeta.name]: County.value });
  };

  handleDelete = agents => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/agents/" + agents.AgentCode, {
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
  handleEdit = agent => {
    const data = {
      Agents: [],
      CostCenter: agent.CostCenter,
      AgentCode: agent.AgentCode,
      AgentName: agent.AgentName,
      AgentAddress: agent.AgentAddress,
      City: agent.City,
      Telephone: agent.Telephone,
      Mobile: agent.Mobile,
      Email: agent.Email,
      Occupation: agent.Occupation,
      ContactPerson: agent.ContactPerson,
      Group: agent.Group
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      CostCenter: this.state.CostCenter,
      AgentCode: this.state.AgentCode,
      AgentName: this.state.AgentName,
      AgentAddress: this.state.AgentAddress,
      City: this.state.City,
      Telephone: this.state.Telephone,
      Mobile: this.state.Mobile,
      Email: this.state.Email,
      Occupation: this.state.Occupation,
      ContactPerson: this.state.ContactPerson,
      Group: this.state.Group
    };
    console.log(data);
    this.postData("api/agents", data);
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
    // this.fetchCounty();
    /// this.fetchCurrency();
    // this.fetchCountries();
  }

  render() {
    const ColumnData = [
      {
        label: "CostCenter",
        field: "CostCenter",
        sort: "asc",
        width: 250
      },

      {
        label: "Agent Code",
        field: "AgentCode",
        sort: "asc",
        width: 200
      },
      {
        label: "Agent Name",
        field: "AgentName",
        sort: "asc",
        width: 200
      },
      {
        label: "Agent Address",
        field: "AgentAddress",
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
        label: "Occupation",
        field: "Occupation",
        sort: "asc",
        width: 200
      },

      {
        label: "ContactPerson",
        field: "ContactPerson",
        sort: "asc",
        width: 200
      },
      {
        label: "Group",
        field: "Group",
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
    const Rows = [...this.state.agents];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          CostCenter: k.CostCenter,
          AgentCode: k.AgentCode,
          AgentName: k.AgentName,
          AgentAddress: k.AgentAddress,
          City: k.City,
          Telephone: k.Telephone,
          Mobile: k.Mobile,
          Email: k.Email,
          Occupation: k.Occupation,
          ContactPerson: k.ContactPerson,
          Group: k.Group,
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
            tablename={"Add Agent"}
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
            Collections={this.state}
          />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Breadcumps
            tablename={"Agents list"}
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
                    <label htmlFor='CostCenter'>CostCenter</label>
                    <input
                      type='text'
                      name='CostCenter'
                      value={props.Values.CostCenter}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter CostCenter'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='AgentName'>AgentName</label>
                    <input
                      type='text'
                      name='AgentName'
                      required
                      value={props.Values.AgentName}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='AgentName'
                      aria-describedby='AgentNameHelp'
                      placeholder='Enter Agent name'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='City'>City</label>
                    <input
                      type='date'
                      name='City'
                      required
                      value={props.Values.City}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='City'
                      aria-describedby='CityHelp'
                      placeholder='Enter City'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Mobile'>Mobile</label>
                    <input
                      type='text'
                      name='Mobile'
                      required
                      value={props.Values.Mobile}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Mobile'
                      aria-describedby='MobileHelp'
                      placeholder='Enter Mobile'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Occupation'>Occupation</label>
                    <input
                      className='form-control'
                      name='Occupation'
                      value={props.Values.Occupation}
                      onChange={props.handleInputChange}
                      placeholder='Enter Occupation'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Group'>Group</label>
                    <input
                      type='text'
                      name='Group'
                      required
                      value={props.Values.Group}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Group'
                      aria-describedby='GroupHelp'
                      placeholder='Enter Group'
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='AgentCode'>AgentCode</label>
                    <input
                      type='text'
                      name='AgentCode'
                      value={props.Values.AgentCode}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='AgentCode'
                      placeholder='AgentCode'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='AgentAddress'>AgentAddress</label>
                    <input
                      type='text'
                      name='AgentAddress'
                      value={props.Values.AgentAddress}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='AgentAddress'
                      placeholder='Address'
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
                    <label htmlFor='Email'>Email</label>
                    <input
                      type='text'
                      name='Email'
                      onChange={props.handleInputChange}
                      value={props.Values.Email}
                      className='form-control'
                      id='Email'
                      aria-describedby='emailHelp'
                      placeholder='Email'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='ContactPerson'>ContactPerson</label>
                    <input
                      type='text'
                      name='ContactPerson'
                      required
                      value={props.Values.ContactPerson}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='ContactPerson'
                      aria-describedby='ContactPersonHelp'
                      placeholder='Enter ContactPerson'
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

export default Agent;
