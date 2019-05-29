import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class CoInsurance extends Component {
    constructor() {
        super();
        this.state = {
            CoInsurance: [],
          
            InsuranceCompanies: [],
            CoID: "",
            Insurer1: "",
            Insurer2: "",
            Insurer1Rate: "",
            Insurer2Rate: "",
           
            AllowStampDuty: false,
         
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
            CoID: "",
            Insurer1: "",
            Insurer2: "",
            Insurer1Rate: "",
            Insurer2Rate: "",
            AllowStampDuty: false,
           
            
        });
    }
    fetchData = () => {
        fetch("api/CoInsurance", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(CoInsurance => {
                if (CoInsurance.length > 0) {
                    this.setState({ CoInsurance: CoInsurance });
                } else {
                    swal("Oops!", CoInsurance.message, "error");
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
                return fetch("api/CoInsurance/" + k, {
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
          
            Insurer1: this.state.Insurer1.value,
            Insurer2: this.state.Insurer2.value,
            Insurer1Rate: this.state.Insurer1Rate,
            Insurer2Rate: this.state.Insurer2Rate,
           
            AllowStampDuty: this.state.AllowStampDuty,
            
        };
        this.postData("/api/CoInsurance", data);
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
     
        this.fetchInsuranceCompanies();
    }

    render() {
        const ColumnData = [
            {
                label: "CoID",
                field: "CoID",
                sort: "asc",
                width: 250
            },
            {
                label: "Insurer1",
                field: "Insurer1",
                sort: "asc",
                width: 270
            },
            {
                label: "Insurer2",
                field: "Insurer2",
                sort: "asc",
                width: 200
            },
            {
                label: "Insurer1Rate",
                field: "Insurer1Rate",
                sort: "asc",
                width: 200
            },
            {
                label: "Insurer2Rate",
                field: "Insurer2Rate",
                sort: "asc"
            },
            
            {
                label: "AllowStampDuty",
                field: "AllowStampDuty",
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
        const Rows = [...this.state.CoInsurance];

        if (Rows.length > 0) {
            Rows.map((k, i) => {
                let Rowdata = {
                    CoID: k.CoID,
                    Insurer1: k.Insurer1,
                    Insurer2: k.Insurer2,
                    Insurer1Rate: k.Insurer1Rate,
                    Insurer2Rate: k.Insurer2Rate,
                    AllowStampDuty: k.AllowStampDuty.toString(),
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
                                onClick={e => this.handleDelete(k.CoID, e)}
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



const Formdata = props => {
    const InsuranceCompaniesoptions = [...props.InsuranceCompanies].map(
        (k, i) => {
            return {
                value: k.InsurerCode.toString(),
                label: k.InsurerName.toString()
            };
        }
    );

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
                                        <label htmlFor="Insurer1">Insurance Company 1</label>
                                        <Select
                                            name="Insurer1"
                                            className="form-group"
                                            defaultInputValue={props.Values.Insurer1}
                                            value={props.Values.Insurer1}
                                            onChange={props.handleSelectChange}
                                            options={InsuranceCompaniesoptions}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Insurer2">Insurance Company2</label>
                                        <Select
                                            name="Insurer2"
                                            className="form-group"
                                            defaultInputValue={props.Values.Insurer2}
                                            value={props.Values.Insurer2}
                                            onChange={props.handleSelectChange}
                                            options={InsuranceCompaniesoptions}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox">
                                            <input
                                                id="checkbox1"
                                                type="checkbox"
                                                name="AllowStampDuty"
                                                onChange={props.handleInputChange}
                                                defaultChecked={props.Values.AllowStampDuty}
                                            />
                                            <label htmlFor="checkbox1">Allow Stamp Duty</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="Insurer1Rate">Insurer1 Rate (%)</label>
                                        <input
                                            type="number"
                                            name="Insurer1Rate"
                                            value={props.Values.Insurer1Rate}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="Insurer1Rate"
                                            placeholder="Insurer1Rate"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Insurer2Rate">Insurer2 Rate (%)</label>
                                        <input
                                            type="number"
                                            name="Insurer2Rate"
                                            value={props.Values.Insurer2Rate}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            required
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

export default CoInsurance;
