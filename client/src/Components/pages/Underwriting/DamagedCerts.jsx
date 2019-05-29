import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import swal from "sweetalert";

class DamagedCert extends Component {
    constructor() {
        super();
        this.state = {
            DamagedCerts: [],
            CostCenter: "",
            CerNo: "",
            Insurer: "",
            Category: "",
            BatchNo: "",
            IsDamaged: true,
            Remarks: ""
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
            CostCenter: "",
            CerNo: "",
            Insurer: "",
            Category: "",
            BatchNo: "",
            IsDamaged: true,
            Remarks: ""
        });
    }
    fetchData = () => {
        fetch("api/damagedcerts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(DamagedCerts => {
                if (DamagedCerts.length > 0) {
                    this.setState({ DamagedCerts });
                } else {
                    swal("Oops!", DamagedCerts.message, "error");
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

    handleDelete = DamagedCerts => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this record?",
            icon: "warning",
            dangerMode: false
        }).then(willDelete => {
            if (willDelete) {
                return fetch("api/damagedcerts/" + DamagedCerts.CerNo, {
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
    handleEdit = data => {        
        this.setState(data);
        this.setState({ reseter: true });
    };
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            CostCenter: this.state.CostCenter,
            CerNo: this.state.CerNo,
            Insurer: this.state.Insurer,
            Category: this.state.Category,
            BatchNo: this.state.BatchNo,
            IsDamaged: this.state.IsDamaged,
            Remarks: this.state.Remarks
         
        };
        console.log(data);
        this.postData("api/damagedcerts", data);
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
                label: "Cert No",
                field: "CerNo",
                sort: "asc",
                width: 200
            },
            {
                label: "Insurer",
                field: "Insurer",
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
                label: "BatchNo",
                field: "BatchNo",
                sort: "asc",
                width: 200
            },
            {
                label: "IsDamaged",
                field: "IsDamaged",
                sort: "asc",
                width: 200
            },
            {
                label: "Remarks",
                field: "Remarks",
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
        const Rows = [...this.state.DamagedCerts];

        if (Rows.length > 0) {
            Rows.map((k, i) => {
                let Rowdata = {
                    CostCenter: k.CostCenter,
                    CerNo: k.CerNo,
                    Insurer: k.Insurer,
                    Category: k.Category,
                    BatchNo: k.BatchNo,
                    IsDamaged: k.IsDamaged.toString(),
                    Remarks: k.Remarks,
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
                        tablename={"Damaged Certs"}
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
                        tablename={"Damaged Certs"}
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
                                        <label htmlFor='Insurer'>Insurer</label>
                                        <input
                                            type='text'
                                            name='Insurer'
                                            required
                                            value={props.Values.Insurer}
                                            className='form-control'
                                            onChange={props.handleInputChange}
                                            id='Insurer'
                                            aria-describedby='InsurerHelp'
                                            placeholder='Enter Insurer'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='BatchNo'>BatchNo</label>
                                        <input
                                            type='text'
                                            name='BatchNo'
                                            required
                                            value={props.Values.BatchNo}
                                            className='form-control'
                                            onChange={props.handleInputChange}
                                            id='BatchNo'
                                            aria-describedby='BatchNoHelp'
                                            placeholder='Enter BatchNo'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='Remarks'>Remarks</label>
                                        <input
                                            type='text'
                                            name='Remarks'
                                            required
                                            value={props.Values.Remarks}
                                            className='form-control'
                                            onChange={props.handleInputChange}
                                            id='Remarks'
                                            aria-describedby='RemarksHelp'
                                            placeholder='Enter Remarks'
                                        />
                                    </div>                                  
                                   
                                </div>
                                <div className='col-sm'>
                                    <div className='form-group'>
                                        <label htmlFor='CerNo'>Cert No</label>
                                        <input
                                            type='text'
                                            name='CerNo'
                                            value={props.Values.CerNo}
                                            onChange={props.handleInputChange}
                                            className='form-control'
                                            id='CerNo'
                                            placeholder='Cert No'
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='Category'>Category</label>
                                        <input
                                            type='text'
                                            name='Category'
                                            value={props.Values.Category}
                                            className='form-control'
                                            onChange={props.handleInputChange}
                                            id='Category'
                                            placeholder='Category'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='IsDamaged'>IsDamaged</label>
                                        <input
                                            type='text'
                                            name='IsDamaged'
                                            value={props.Values.IsDamaged}
                                            className='form-control'
                                            onChange={props.handleInputChange}
                                            id='IsDamaged'
                                            placeholder='IsDamaged'
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

export default DamagedCert;
