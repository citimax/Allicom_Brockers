import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class MotorVehicle extends Component {
  constructor() {
    super();
    this.state = {
      vehicleMake: [],
      MotorVehicle: [],
      RegNo: "",
      CostCenter: "",
      make: "Toyota",
      Model: "Premio",
      Body: "",
      Colour: "",
      ChasisNo: "",
      EngineNo: "",
      Fuel: "",
      SeatCapacity: "",
      Rating: 1200,
      Tonnage: "0",
      YearMDF: 2019,
      vehiclevalue: 0,
      WindScreen: "",
      RadioSystem: "",
      Accessories: "",
      FleatName: "",
      OtherDetails: ""
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
      RegNo: "",
      CostCenter: "",
      make: "Toyota",
      Model: "Premio",
      Body: "",
      Colour: "",
      ChasisNo: "",
      EngineNo: "",
      Fuel: "",
      SeatCapacity: "",
      Rating: 1200,
      Tonnage: "0",
      YearMDF: 2019,
      vehiclevalue: 0,
      WindScreen: "",
      RadioSystem: "",
      Accessories: "",
      FleatName: "",
      OtherDetails: ""
    });
  }
  fetchData = () => {
    fetch("api/motorvehicle", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(MotorVehicle => {
        if (MotorVehicle.length > 0) {
          this.setState({ MotorVehicle: MotorVehicle });
        } else {
          swal("Oops!", MotorVehicle.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  //   fetchAgent = () => {
  //     fetch("api/agents", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token")
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(AgentOptions => {
  //         if (AgentOptions.length > 0) {
  //           this.setState({ AgentOptions });
  //         } else {
  //           swal("Oops!", AgentOptions.message, "error");
  //         }
  //       })
  //       .catch(err => {
  //         swal("Oops!", err.message, "error");
  //       });
  //   };

  //   fetchCategory = () => {
  //     fetch("api/clientcategory", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-access-token": localStorage.getItem("token")
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(vehicleMake => {
  //         if (vehicleMake.length > 0) {
  //           this.setState({ vehicleMake });
  //         } else {
  //           swal("Oops!", vehicleMake.message, "error");
  //         }
  //       })
  //       .catch(err => {
  //         swal("Oops!", err.message, "error");
  //       });
  //   };

  fetchVmake = () => {
    fetch("api/vehiclemake", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(vehicleMake => {
        if (vehicleMake.length > 0) {
          this.setState({ vehicleMake });
        } else {
          swal("Oops!", vehicleMake.message, "error");
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

  handleDelete = Vehicle => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/motorvehicle/" + Vehicle.RegNo, {
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
  handleEdit = MotorVehicle => {
    const data = {
      RegNo: MotorVehicle.RegNo,
      CostCenter: MotorVehicle.CostCenter,
      make: MotorVehicle.make,
      Model: MotorVehicle.Model,
      Body: MotorVehicle.Body,
      Colour: MotorVehicle.Colour,
      ChasisNo: MotorVehicle.ChasisNo,
      EngineNo: MotorVehicle.EngineNo,
      Fuel: MotorVehicle.Fuel,
      SeatCapacity: MotorVehicle.SeatCapacity,
      Rating: MotorVehicle.Rating,
      Tonnage: MotorVehicle.Tonnage,
      YearMDF: MotorVehicle.YearMDF,
      vehiclevalue: MotorVehicle.vehiclevalue,
      WindScreen: MotorVehicle.WindScreen,
      RadioSystem: MotorVehicle.RadioSystem,
      Accessories: MotorVehicle.Accessories,
      FleatName: MotorVehicle.FleatName,
      OtherDetails: MotorVehicle.OtherDetails
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      RegNo: this.state.RegNo,
      CostCenter: this.state.CostCenter,
      make: this.state.make.value,
      Model: this.state.Model,
      Body: this.state.Body,
      Colour: this.state.Colour,
      ChasisNo: this.state.ChasisNo,
      EngineNo: this.state.EngineNo,
      Fuel: this.state.Fuel,
      SeatCapacity: this.state.SeatCapacity,
      Rating: this.state.Rating,
      Tonnage: this.state.Tonnage,
      YearMDF: this.state.YearMDF,
      vehiclevalue: this.state.vehiclevalue,
      WindScreen: this.state.WindScreen,
      RadioSystem: this.state.RadioSystem,
      Accessories: this.state.Accessories,
      FleatName: this.state.FleatName,
      OtherDetails: this.state.OtherDetails
    };
    console.log(data);
    this.postData("api/motorvehicle", data);
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
    this.fetchVmake();
    // this.fetchCurrency();
    // this.fetchCategory();
  }

  render() {
    const ColumnData = [
      {
        label: "RegNo",
        field: "RegNo",
        sort: "asc",
        width: 250
      },

      {
        label: "Cost Center",
        field: "CostCenter",
        sort: "asc",
        width: 200
      },
      {
        label: "make",
        field: "make",
        sort: "asc",
        width: 200
      },
      {
        label: "Model",
        field: "Model",
        sort: "asc",
        width: 200
      },
      {
        label: "Body",
        field: "Body",
        sort: "asc",
        width: 200
      },
      {
        label: "Colour",
        field: "Colour",
        sort: "asc",
        width: 200
      },
      {
        label: "Chasis No",
        field: "ChasisNo",
        sort: "asc",
        width: 200
      },
      {
        label: "EngineNo",
        field: "EngineNo",
        sort: "asc",
        width: 200
      },
      {
        label: "Fuel",
        field: "Fuel",
        sort: "asc",
        width: 200
      },
      {
        label: "Seat Capacity",
        field: "SeatCapacity",
        sort: "asc",
        width: 200
      },
      {
        label: "Rating(C.C)",
        field: "Rating",
        sort: "asc",
        width: 200
      },
      {
        label: "Tonnage",
        field: "Tonnage",
        sort: "asc",
        width: 200
      },
      {
        label: "YearMDF",
        field: "YearMDF",
        sort: "asc",
        width: 200
      },
      {
        label: "vehicle value",
        field: "vehiclevalue",
        sort: "asc",
        width: 200
      },
      {
        label: "WindScreen",
        field: "WindScreen",
        sort: "asc",
        width: 200
      },
      {
        label: "Radio System",
        field: "RadioSystem",
        sort: "asc",
        width: 200
      },
      {
        label: "Accessories",
        field: "Accessories",
        sort: "asc",
        width: 200
      },
      {
        label: "Fleat Name",
        field: "FleatName",
        sort: "asc",
        width: 200
      },
      {
        label: "Other Details",
        field: "OtherDetails",
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
    const Rows = [...this.state.MotorVehicle];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          RegNo: k.RegNo,
          CostCenter: k.CostCenter,
          make: k.make,
          Model: k.Model,
          Body: k.Body,
          Colour: k.Colour,
          ChasisNo: k.ChasisNo,
          EngineNo: k.EngineNo,
          Fuel: k.Fuel,
          SeatCapacity: k.SeatCapacity,
          Rating: k.Rating,
          Tonnage: k.Tonnage,
          YearMDF: k.YearMDF,
          vehiclevalue: k.vehiclevalue,
          WindScreen: k.WindScreen,
          RadioSystem: k.RadioSystem,
          Accessories: k.Accessories,
          FleatName: k.FleatName,
          OtherDetails: k.OtherDetails,
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
            tablename={"Add Vehicle"}
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
            tablename={"Vehicle list"}
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
  const vehicleMakeOptions = [...props.Values.vehicleMake].map((k, i) => {
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
                    <label htmlFor='RegNo'>RegNo</label>
                    <input
                      type='text'
                      name='RegNo'
                      value={props.Values.RegNo}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter RegNo'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='make'>make</label>
                    <Select
                      name='make'
                      required
                      value={props.Values.make}
                      defaultInputValue={props.Values.make}
                      onChange={props.handleSelectChange}
                      options={vehicleMakeOptions}
                      placeholder='Enter vehicle make'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Body'>Body</label>
                    <input
                      type='date'
                      name='Body'
                      required
                      value={props.Values.Body}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Body'
                      aria-describedby='BodyHelp'
                      placeholder='Enter vehicle Body'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='ChasisNo'>ChasisNo</label>
                    <input
                      type='text'
                      name='ChasisNo'
                      required
                      value={props.Values.ChasisNo}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='ChasisNo'
                      aria-describedby='ChasisNoHelp'
                      placeholder='Enter Chasis No'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Fuel'>Fuel</label>
                    <input
                      className='form-control'
                      name='Fuel'
                      value={props.Values.Fuel}
                      onChange={props.handleInputChange}
                      placeholder='Enter Fuel'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Rating'>Rating(C.C)</label>
                    <input
                      type='text'
                      name='Rating'
                      required
                      value={props.Values.Rating}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Rating'
                      aria-describedby='RatingHelp'
                      placeholder='Enter Rating'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='YearMDF'>Year MDF</label>
                    <input
                      type='text'
                      name='YearMDF'
                      required
                      value={props.Values.YearMDF}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='YearMDF'
                      aria-describedby='YearMDFHelp'
                      placeholder='Enter YearMDF'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='WindScreen'>WindScreen</label>
                    <input
                      type='text'
                      name='WindScreen'
                      required
                      value={props.Values.WindScreen}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='WindScreen'
                      aria-describedby='WindScreenHelp'
                      placeholder='Enter wind screen'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Accessories'>Accessories</label>
                    <input
                      type='text'
                      name='Accessories'
                      required
                      value={props.Values.Accessories}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Accessories'
                      aria-describedby='AccessoriesHelp'
                      placeholder='Enter Accessories'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='OtherDetails'>Other Details</label>
                    <input
                      type='text'
                      name='OtherDetails'
                      required
                      value={props.Values.OtherDetails}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='OtherDetails'
                      aria-describedby='OtherDetailsHelp'
                      placeholder='Enter other details'
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='CostCenter'>Cost Center</label>
                    <input
                      type='text'
                      name='CostCenter'
                      value={props.Values.CostCenter}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='CostCenter'
                      placeholder='CostCenter'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Model'>Model</label>
                    <input
                      type='text'
                      name='Model'
                      value={props.Values.Model}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Model'
                      placeholder='Model'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Colour'>Colour</label>
                    <input
                      type='text'
                      name='Colour'
                      value={props.Values.Colour}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Colour'
                      placeholder='Colour'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='EngineNo'>EngineNo</label>
                    <input
                      type='text'
                      name='EngineNo'
                      onChange={props.handleInputChange}
                      value={props.Values.EngineNo}
                      className='form-control'
                      id='EngineNo'
                      aria-describedby='EngineNoHelp'
                      placeholder='Engine No'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='SeatCapacity'>Seat Capacity</label>
                    <input
                      type='text'
                      name='SeatCapacity'
                      onChange={props.handleInputChange}
                      value={props.Values.SeatCapacity}
                      className='form-control'
                      id='SeatCapacity'
                      aria-describedby='SeatCapacityHelp'
                      placeholder='Seat Capacity'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Tonnage'>Tonnage</label>
                    <input
                      type='text'
                      name='Tonnage'
                      required
                      value={props.Values.Tonnage}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Tonnage'
                      aria-describedby='TonnageHelp'
                      placeholder='Enter Tonnage'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='vehiclevalue'>vehicle value</label>
                    <input
                      type='number'
                      name='vehiclevalue'
                      required
                      className='form-control'
                      onChange={props.handleInputChange}
                      value={props.Values.vehiclevalue}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='RadioSystem'>Radio System</label>
                    <input
                      type='text'
                      name='RadioSystem'
                      required
                      value={props.Values.RadioSystem}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='RadioSystem'
                      aria-describedby='RadioSystemHelp'
                      placeholder='Enter Radio System'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='FleatName'>Fleat Name</label>
                    <input
                      type='text'
                      name='FleatName'
                      required
                      value={props.Values.FleatName}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='FleatName'
                      aria-describedby='FleatNameHelp'
                      placeholder='Enter Fleat Name'
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

export default MotorVehicle;
