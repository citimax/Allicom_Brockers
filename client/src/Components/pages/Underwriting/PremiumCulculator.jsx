import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class PremiumCalculator extends Component {
    constructor() {
        super();
        this.state = {
            Items:[],
            PremiumCalc:[],
            CalcCode: "",
            CalcName: "",
            Description: "",
            Item:"",
            AddBrokerRate: true,
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
            CalcCode: "",
            CalcName: "",
            Description: "",
            Item:"",
            AddBrokerRate: true,
        });
    }
    fetchData = () => {
        fetch("api/premiumcalc", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PremiumCalc => {
                if (PremiumCalc.length > 0) {
                    this.setState({ PremiumCalc: PremiumCalc });
                } else {
                    swal("Oops!", PremiumCalc.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    fetchItems = () => {
        fetch("api/calcitems", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ Items: data });
                } else {
                    swal("Oops!", data.message, "error");
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
    handleSelectChange = (data, actionMeta) => {
       
        this.setState({ [actionMeta.name]: data });
    };
    handleDelete = k => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this record?",
            icon: "warning",
            dangerMode: false
        }).then(willDelete => {
            if (willDelete) {
                return fetch("api/premiumcalc/" + k, {
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
    handleEdit = premiumcalc => {       
        this.setState(premiumcalc);
        this.setState({ reseter: true });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.state.Item.map((k, i) => {

            const data = {
                CalcCode: this.state.CalcCode,
                CalcName: this.state.CalcName,
                Description: this.state.Description,
                Item: k.value,
                AddBrokerRate: this.state.AddBrokerRate,
            };
            
            this.postData("/api/premiumcalc", data);
        });          
      
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
        this.fetchItems();
    }

    render() {
        const ColumnData = [
            {
                label: "Calc Code",
                field: "CalcCode",
                sort: "asc",
                width: 250
            },

            {
                label: "Calc Name",
                field: "CalcName",
                sort: "asc",
                width: 270
            },

            {
                label: "Description",
                field: "Description",
                sort: "asc",
                width: 270
            },
            {
                label: "Add Broker Rate",
                field: "AddBrokerRate",
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
        const Rows = [...this.state.PremiumCalc];

        if (Rows.length > 0) {
            Rows.map((k, i) => {
                let Rowdata = {
                    CalcCode: k.CalcCode,
                    CalcName: k.CalcName,
                    Description: k.Description,
                  
                    AddBrokerRate: k.AddBrokerRate.toString(),
                    action: (
                        <span>
                            {" "}
                            <a
                                style={{ color: "#007bff" }}
                                onClick={e => this.handleEdit(k, e)}>
                                Edit </a>
                            |{" "}
                            <a style={{ color: "#f44542" }}
                                onClick={e => this.handleDelete(k, e)}>
                                {" "}
                                Delete</a>
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
                        tablename={"Premium calculator"}
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
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <Breadcumps
                        tablename={"Premium calculator"}
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
    const ItemOptions = props.Values.Items.map((k, i) => {
        return {
            value: k.ItemCode,
            label: k.ItemName
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
                                        <label htmlFor='CalcCode'>CalcCode</label>
                                        <input
                                            type='text'
                                            name='CalcCode'
                                            value={props.Values.CalcCode}
                                            onChange={props.handleInputChange}
                                            className='form-control'
                                            id='exampleInputCalcCode'
                                            aria-describedby='CalcCodeHelp'
                                            placeholder='Enter CalcCode'
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='CalcName'>Calc Name</label>
                                        <input
                                            type='text'
                                            name='CalcName'
                                            value={props.Values.CalcName}
                                            onChange={props.handleInputChange}
                                            className='form-control'
                                            id='CalcName'
                                            aria-describedby='CalcNameHelp'
                                            placeholder='Enter Calc Name'
                                            required
                                        />
                                    </div>

                                    <div className='checkbox'>
                                        <input
                                            id='AddBrokerRate'
                                            type='checkbox'
                                            name='AddBrokerRate'
                                            onChange={props.handleInputChange}
                                            checked={props.Values.AddBrokerRate}
                                        />
                                        <label htmlFor='AddBrokerRate'>Add Broker Rate</label>
                                    </div>
                                  
                                </div>
                                <div className='col-sm'>
                                    <div className='form-group'>
                                        <label htmlFor='Description'>Description</label>
                                        <input
                                            type='text'
                                            name='Description'
                                            value={props.Values.Description}
                                            onChange={props.handleInputChange}
                                            className='form-control'
                                            id='Description'
                                            aria-describedby='DescriptionHelp'
                                            placeholder='Enter Description'
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label >Items</label>
                                        <Select
                                            name='Item'
                                            isMulti
                                            onChange={props.handleSelectChange}
                                            value={props.Values.Item}
                                            options={ItemOptions}
                                            defaultInputValue={props.Values.Item}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
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

export default PremiumCalculator;
