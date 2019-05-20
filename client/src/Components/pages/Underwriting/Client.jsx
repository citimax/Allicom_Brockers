import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class Client extends Component {
  constructor() {
    super();
    this.state = {
      CurrencyData: [],
      AgentOptions: [],
      CategoryOptions: [],
      client: [],
      ClientCode: "",
      ClientName: "",
      ClientAddress: "",
      PINNO: "",
      DOB: "2099-05-13",
      IDNo: "",
      Passport: "",
      City: "Nairobi",
      Telephone: "",
      Mobile: "",
      Email: "email@email.com",
      Company: "001",
      CostCenter: "001",
      Occupation: "",
      Agent: "",
      ContactPerson: "",
      PhysicalLocation: "",
      IncorparationNo: "",
      Currency: "KES",
      Domant: true,
      Category: ""
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
      ClientCode: "0",
      ClientName: "0",
      ClientAddress: "0",
      PINNO: "0",
      DOB: "2099-05-13",
      IDNo: "0",
      Passport: "0",
      City: "Nairobi",
      Telephone: "0",
      Mobile: "0",
      Email: "email@email.com",
      Company: "001",
      CostCenter: "001",
      Occupation: "0",
      Agent: "0",
      ContactPerson: "0",
      PhysicalLocation: "0",
      IncorparationNo: "0",
      Currency: "KES",
      Domant: true,
      Category: "User"
    });
  }
  fetchData = () => {
    fetch("api/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(client => {
        if (client.length > 0) {
          this.setState({ client });
        } else {
          swal("Oops!", client.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  fetchAgent = () => {
    fetch("api/agents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(AgentOptions => {
        if (AgentOptions.length > 0) {
          this.setState({ AgentOptions });
        } else {
          swal("Oops!", AgentOptions.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  fetchCategory = () => {
    fetch("api/clientcategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(CategoryOptions => {
        if (CategoryOptions.length > 0) {
          this.setState({ CategoryOptions });
        } else {
          swal("Oops!", CategoryOptions.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  fetchCurrency = () => {
    fetch("api/currency", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(CurrencyData => {
        if (CurrencyData.length > 0) {
          this.setState({ CurrencyData: CurrencyData });
        } else {
          swal("Oops!", CurrencyData.message, "error");
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

  handleDelete = client => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/clients/" + client.ClientCode, {
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
  handleEdit = client => {
    const data = {
      ClientCode: client.ClientCode,
      ClientName: client.ClientName,
      ClientAddress: client.ClientAddress,
      PINNO: client.PINNO,
      DOB: client.DOB,
      IDNo: client.IDNo,
      Passport: client.Passport,
      City: client.City,
      Telephone: client.Telephone,
      Mobile: client.Mobile,
      Email: client.Email,
      Company: client.Company,
      CostCenter: client.CostCenter,
      Occupation: client.Occupation,
      Agent: client.Agent,
      ContactPerson: client.ContactPerson,
      PhysicalLocation: client.PhysicalLocation,
      IncorparationNo: client.IncorparationNo,
      Currency: client.Currency,
      Domant: client.Domant,
      Category: client.Category
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      ClientCode: this.state.ClientCode,
      ClientName: this.state.ClientName,
      ClientAddress: this.state.ClientAddress,
      PINNO: this.state.PINNO,
      DOB: this.state.DOB,
      IDNo: this.state.IDNo,
      Passport: this.state.Passport,
      City: this.state.City,
      Telephone: this.state.Telephone,
      Mobile: this.state.Mobile,
      Email: this.state.Email,
      CostCenter: this.state.CostCenter,
      Occupation: this.state.Occupation,
      Agent: this.state.Agent.value,
      ContactPerson: this.state.ContactPerson,
      PhysicalLocation: this.state.PhysicalLocation,
      IncorparationNo: this.state.IncorparationNo,
      Currency: this.state.Currency.value,
      Domant: this.state.Domant,
      Category: this.state.Category.value
    };
    console.log(data);
    this.postData("api/clients", data);
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
    this.fetchAgent();
    this.fetchCurrency();
    this.fetchCategory();
  }

  render() {
    const ColumnData = [
      {
        label: "ClientCode",
        field: "ClientCode",
        sort: "asc",
        width: 250
      },
      {
        label: "ClientName",
        field: "ClientName",
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
        label: "PINNO",
        field: "PINNO",
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
        label: "IDNo",
        field: "IDNo",
        sort: "asc",
        width: 200
      },
      {
        label: "Passport",
        field: "Passport",
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
        label: "Company",
        field: "Company",
        sort: "asc",
        width: 200
      },
      {
        label: "CostCenter",
        field: "CostCenter",
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
        label: "Agent",
        field: "Agent",
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
        label: "PhysicalLocation",
        field: "PhysicalLocation",
        sort: "asc",
        width: 200
      },
      {
        label: "IncorparationNo",
        field: "IncorparationNo",
        sort: "asc",
        width: 200
      },
      {
        label: "Currency",
        field: "Currency",
        sort: "asc",
        width: 200
      },
      {
        label: "Domant",
        field: "Domant",
        sort: "asc",
        width: 200
      },
      {
        label: "Category",
        field: "Category",
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
    const Rows = [...this.state.client];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          ClientCode: k.ClientCode,
          ClientName: k.ClientName,
          ClientAddress: k.ClientAddress,
          PINNO: k.PINNO,
          DOB: k.DOB,
          IDNo: k.IDNo,
          Passport: k.Passport,
          City: k.City,
          Telephone: k.Telephone,
          Mobile: k.Mobile,
          Email: k.Email,
          Company: k.Company,
          CostCenter: k.CostCenter,
          Occupation: k.Occupation,
          Agent: k.Agent,
          ContactPerson: k.ContactPerson,
          PhysicalLocation: k.PhysicalLocation,
          IncorparationNo: k.IncorparationNo,
          Currency: k.Currency,
          Domant: k.Domant,
          Category: k.Category,
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
        <div>
          <Breadcumps
            tablename={"Add Client"}
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
        </div>
      );
    } else {
      return (
        <div>
          <Breadcumps
            tablename={"Client list"}
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
  const CurrencyDataOtions = [...props.Values.CurrencyData].map((k, i) => {
    return {
      value: k.CurrCode,
      label: k.CurrDesc
    };
  });

  const AgentOptions = [...props.Values.AgentOptions].map((k, i) => {
    return {
      value: k.AgentCode,
      label: k.AgentName
    };
  });
  const CategoryOptions = [...props.Values.CategoryOptions].map((k, i) => {
    return {
      value: k.Code,
      label: k.Name
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
                    <label htmlFor='CompCode'>ClientCode</label>
                    <input
                      type='text'
                      name='ClientCode'
                      value={props.Values.ClientCode}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter ClientCode'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='ClientAddress'>ClientAddress</label>
                    <input
                      type='text'
                      name='ClientAddress'
                      required
                      value={props.Values.ClientAddress}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='ClientAddress'
                      aria-describedby='ClientAddressHelp'
                      placeholder='Enter Client address'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='DOB'>DOB</label>
                    <input
                      type='date'
                      name='DOB'
                      required
                      value={props.Values.DOB}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='DOB'
                      aria-describedby='DOBHelp'
                      placeholder='Enter DOB'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='IDNo'>IDNo</label>
                    <input
                      type='text'
                      name='IDNo'
                      required
                      value={props.Values.IDNo}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='IDNo'
                      aria-describedby='IDNoHelp'
                      placeholder='Enter IDNo'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Passport'>Passport</label>
                    <input
                      className='form-control'
                      name='Passport'
                      value={props.Values.Passport}
                      onChange={props.handleInputChange}
                      placeholder='Enter Passport'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='City'>City</label>
                    <input
                      type='text'
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
                    <label htmlFor='Occupation'>Occupation</label>
                    <input
                      type='text'
                      name='Occupation'
                      required
                      value={props.Values.Occupation}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Occupation'
                      aria-describedby='OccupationHelp'
                      placeholder='Enter Occupation'
                    />
                  </div>{" "}
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='ClientName'>ClientName</label>
                    <input
                      type='text'
                      name='ClientName'
                      value={props.Values.ClientName}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='ClientName'
                      placeholder='ClientName'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='PINNO'>PINNO</label>
                    <input
                      type='text'
                      name='PINNO'
                      value={props.Values.PINNO}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='PINNO'
                      placeholder='PINNO'
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
                    <label htmlFor='Mobile'>Mobile</label>
                    <input
                      type='text'
                      name='Mobile'
                      onChange={props.handleInputChange}
                      value={props.Values.Mobile}
                      className='form-control'
                      id='Mobile'
                      aria-describedby='emailHelp'
                      placeholder='Mobile'
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
                    <label htmlFor='CostCenter'>CostCenter</label>
                    <input
                      type='text'
                      name='CostCenter'
                      required
                      value={props.Values.CostCenter}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='CostCenter'
                      aria-describedby='CostCenterHelp'
                      placeholder='Enter CostCenter'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Agent'>Agent</label>
                    <Select
                      name='Agent'
                      onChange={props.handleSelectChange}
                      value={props.Values.Agent}
                      options={AgentOptions}
                      defaultInputValue={props.Values.Agent}
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='ContactPerson'>Contact Person</label>
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
                  <div className='form-group'>
                    <label htmlFor='IncorparationNo'>Incorparation No</label>
                    <input
                      type='text'
                      name='IncorparationNo'
                      required
                      value={props.Values.IncorparationNo}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='IncorparationNo'
                      aria-describedby='IncorparationNoHelp'
                      placeholder='Enter IncorparationNo'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Category'>Category</label>
                    <Select
                      name='Category'
                      value={props.Values.Category}
                      onChange={props.handleSelectChange}
                      options={CategoryOptions}
                      defaultInputValue={props.Values.Category}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='PhysicalLocation'>PhysicalLocation</label>
                    <input
                      type='text'
                      name='PhysicalLocation'
                      onChange={props.handleInputChange}
                      value={props.Values.PhysicalLocation}
                      className='form-control'
                      id='PhysicalLocation'
                      aria-describedby='PhysicalLocationHelp'
                      placeholder='PhysicalLocation'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Currency'>Currency</label>
                    <Select
                      className='select2_demo_3'
                      name='Currency'
                      value={props.Values.Currency}
                      onChange={props.handleSelectChange}
                      options={CurrencyDataOtions}
                      defaultInputValue={props.Values.Currency}
                    />
                  </div>

                  <div className='checkbox'>
                    <input
                      id='Domant'
                      type='checkbox'
                      name='Domant'
                      onChange={props.handleInputChange}
                      checked={props.Values.Domant}
                    />
                    <label htmlFor='Domant'>Domant</label>
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

export default Client;
