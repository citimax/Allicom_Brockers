import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";

class CalcItems extends Component {
  constructor() {
    super();
    this.state = {
      Calc: [],
      ItemCode: "",
      ItemName: "",
      ItemGroup: "",
      ControlAcc: "",
      RateType: "",
      Method: "",
      Rate: 0,
      OrderNumber: ""
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
      ItemCode: "",
      ItemName: "",
      ItemGroup: "",
      ControlAcc: "",
      RateType: "",
      Method: "",
      Rate: "",
      OrderNumber: ""
    });
  }
  fetchData = () => {
    fetch("api/calcitems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Calc => {
        if (Calc.length > 0) {
          this.setState({ Calc: Calc });
        } else {
          swal("Oops!", Calc.message, "error");
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
        return fetch("api/calcitems/" + k, {
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
  handleEdit = Item => {
    // const data = {
    //     InsurerCode: Item.InsurerCode,
    //     ItemCode: Item.InsurerCode,
    //     ItemGroup: Item.InsurerCode,
    //     ControlAcc: Item.InsurerCode,
    //     RateType: Item.RateType,
    //     Method: Item.Method,
    //     Rate: Item.Rate,
    //     OrderNumber: Item.OrderNumber
    // };
    this.setState(Item);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      ItemCode: this.state.ItemCode,
      ItemName: this.state.ItemName,
      ItemGroup: this.state.ItemGroup,
      ControlAcc: this.state.ControlAcc,
      RateType: this.state.RateType,
      Method: this.state.Method,
      Rate: this.state.Rate,
      OrderNumber: this.state.OrderNumber
    };

    this.postData("/api/calcitems", data);
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
        label: "ItemCode",
        field: "ItemCode",
        sort: "asc",
        width: 250
      },

      {
        label: "ItemName",
        field: "ItemName",
        sort: "asc",
        width: 270
      },

      {
        label: "Item Group",
        field: "ItemGroup",
        sort: "asc",
        width: 270
      },

      {
        label: "Control Acc",
        field: "ControlAcc",
        sort: "asc",
        width: 200
      },
      {
        label: "Rate Type",
        field: "RateType",
        sort: "asc",
        width: 200
      },
      {
        label: "Method",
        field: "Method",
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
        label: "Order Number",
        field: "OrderNumber",
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
    const Rows = [...this.state.Calc];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          ItemCode: k.ItemCode,
          ItemName: k.ItemName,
          ItemGroup: k.ItemGroup,
          ControlAcc: k.ControlAcc,
          RateType: k.RateType,
          Method: k.Method,
          Rate: k.Rate,
          OrderNumber: k.OrderNumber,
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
                onClick={e => this.handleDelete(k.ItemCode, e)}>
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
            tablename={"Add Calc Items"}
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
        </div>
      );
    } else {
      return (
        <div>
          <Breadcumps
            tablename={"Calc Items"}
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
                    <label htmlFor='ItemCode'>ItemCode</label>
                    <input
                      type='text'
                      name='ItemCode'
                      value={props.Values.ItemCode}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputItemCode'
                      aria-describedby='ItemCodeHelp'
                      placeholder='Enter ItemCode'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='ControlAcc'>ControlAcc</label>
                    <input
                      type='text'
                      name='ControlAcc'
                      value={props.Values.ControlAcc}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='ControlAcc'
                      aria-describedby='ControlAccHelp'
                      placeholder='Enter ControlAcc'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='RateType'>RateType</label>
                    <input
                      type='text'
                      name='RateType'
                      value={props.Values.RateType}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='RateType'
                      aria-describedby='RateTypeHelp'
                      placeholder='Enter RateType'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Method'>Method</label>
                    <input
                      type='text'
                      name='Method'
                      value={props.Values.Method}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='Method'
                      aria-describedby='MethodHelp'
                      placeholder='Enter Method'
                      required
                    />
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='ItemName'>ItemName</label>
                    <input
                      type='text'
                      name='ItemName'
                      value={props.Values.ItemName}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='ItemName'
                      aria-describedby='ItemNameHelp'
                      placeholder='Enter ItemName'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='ItemGroup'>ItemGroup</label>
                    <input
                      type='text'
                      name='ItemGroup'
                      value={props.Values.ItemGroup}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='ItemGroup'
                      aria-describedby='ItemGroupHelp'
                      placeholder='Enter ItemGroup'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='Rate'>Rate</label>
                    <input
                      type='text'
                      name='Rate'
                      value={props.Values.Rate}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='Rate'
                      aria-describedby='RateHelp'
                      placeholder='Enter Rate'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='OrderNumber'>OrderNumber</label>
                    <input
                      type='text'
                      name='OrderNumber'
                      value={props.Values.OrderNumber}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='OrderNumber'
                      aria-describedby='OrderNumberHelp'
                      placeholder='Enter OrderNumber'
                      required
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

export default CalcItems;
