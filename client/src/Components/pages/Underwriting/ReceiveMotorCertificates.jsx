import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";
//import { js } from "./bootstrap";

class ReceiveMotorCertificates extends Component {
    constructor() {
        super();
        this.state = {
            ReceiveMotorCertificates: [],
           
            Abbreviation: "",
            InsuranceCompany: "",
            Datereceived: "",
            CertType: "",
            FirstNo: "",
            LastNo: "",
            CostCenter: "",
            InsuranceCompanies:[],
            CostCenters:[]
           
        };
    }
    fetchCostCenters = () => {
        fetch("api/CostCenter", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ CostCenters: data });
                } else {
                    swal("Oops!", data.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
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
            MemberCode: "",
            Abbreviation: "",
            InsuranceCompany: "",
            Datereceived: "",
            CertType: "",
            FirstNo: "",          
            CostCenter: "",
            LastNo: "",
          
        });
    }
    setabrev = (data, actionMeta) => {
        this.setState({ [actionMeta.name]: data });
       
        if (data.value == "COMMERCIAL") {
            this.setState({ Abbreviation: "B" });
        }
        if (data.value == "MOTOR CYCLES") {
            this.setState({ Abbreviation: "D" });
        }
        if (data.value == "PRIVATE") {
            this.setState({ Abbreviation: "C" });
        }
        if (data.value == "P.S.V") {
            this.setState({ Abbreviation: "A" });
        }
    }
    fetchData = () => {
        fetch("api/ReceiveMotorCertificates", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ReceiveMotorCertificates => {
                if (ReceiveMotorCertificates.length > 0) {
                    this.setState({ ReceiveMotorCertificates });
                } else {
                    swal("Oops!", ReceiveMotorCertificates.message, "error");
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

    handleDelete = ReceiveMotorCertificates => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this record?",
            icon: "warning",
            dangerMode: false
        }).then(willDelete => {
            if (willDelete) {
                return fetch("api/ReceiveMotorCertificates/" + ReceiveMotorCertificates.CertType + "/" + ReceiveMotorCertificates.FirstNo + "/" + ReceiveMotorCertificates.LastNo, {
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
    handleEdit = ReceiveMotorCertificates => {
        // const data = {
           
        //     Abbreviation: ReceiveMotorCertificates.Abbreviation,
        //     InsuranceCompany: ReceiveMotorCertificates.InsuranceCompany,
        //     Datereceived: ReceiveMotorCertificates.Datereceived,
        //     CertType: ReceiveMotorCertificates.CertType,
        //     FirstNo: ReceiveMotorCertificates.FirstNo,
        //     LastNo: ReceiveMotorCertificates.LastNo,
        //     CostCenter: ReceiveMotorCertificates.CostCenter,
         
           
        // };
        this.setState(ReceiveMotorCertificates);
        this.setState({ reseter: true });
    };
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            Abbreviation: this.state.Abbreviation,
            InsuranceCompany: this.state.InsuranceCompany.value,
            Datereceived: this.state.Datereceived,
            CertType: this.state.CertType.value,
            FirstNo: this.state.FirstNo,
            LastNo: this.state.LastNo,
            CostCenter: this.state.CostCenter.value
        };

        this.postData("api/ReceiveMotorCertificates", data);
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
        this.fetchInsuranceCompanies();
        this.fetchCostCenters();
    }

    render() {
        const ColumnData = [
            
            {
                label: "Abbreviation",
                field: "Abbreviation",
                sort: "asc",
                width: 250
            },
             {
                 label: "BatchNo",
                 field: "BatchNo",
                sort: "asc",
                width: 250
            },

            {
                label: "InsuranceCompany",
                field: "InsuranceCompany",
                sort: "asc",
                width: 200
            },
            {
                label: "Datereceived",
                field: "Datereceived",
                sort: "asc",
                width: 200
            },
            {
                label: "CertType",
                field: "CertType",
                sort: "asc",
                width: 200
            },
            {
                label: "FirstNo",
                field: "FirstNo",
                sort: "asc",
                width: 200
            },
            {
                label: "LastNo",
                field: "LastNo",
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
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];
        const Rows = [...this.state.ReceiveMotorCertificates];

        if (Rows.length > 0) {
            Rows.map((k, i) => {
                let Rowdata = {
                 

                    Abbreviation: k.Abbreviation,
                    BatchNo: k.BatchNo,
                    InsuranceCompany: k.InsuranceCompany,
                    Datereceived: k.Datereceived,
                    CertType: k.CertType,
                    FirstNo: k.FirstNo,
                    LastNo: k.LastNo,
                    CostCenter: k.CostCenter,

                 
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
                                onClick={e => this.handleDelete(k, e)}
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
                        tablename={"Add ReceiveMotorCertificates"}
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
                        handleSelectChange={this.handleSelectChange}
                        Collections={this.state}
                        typechange={this.setabrev}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <Breadcumps
                        tablename={"ReceiveMotorCertificates list"}
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
    const CertTypeOptions = [
        {
            value: "P.S.V",
            label: "P.S.V"
        },
        {
            value: "COMMERCIAL",
            label: "COMMERCIAL"
        },
        {
            value: "PRIVATE",
            label: "PRIVATE"
        },
        {
            value: "MOTOR CYCLES",
            label: "MOTOR CYCLES"
        }
    ];
    const InsuranceCompaniesoptions = [...props.Values.InsuranceCompanies].map(
        (k, i) => {
            return {
                value: k.InsurerCode.toString(),
                label: k.InsurerName.toString()
            };
        }
    );
    const CostCenteroptions = [...props.Values.CostCenters].map(
        (k, i) => {
            return {
                value: k.CCCode.toString(),
                label: k.CCName.toString()
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
                                        <label htmlFor="Datereceived">Datereceived</label>
                                        <input
                                            type="date"
                                            name="Datereceived"
                                            required
                                            value={props.Values.Datereceived}
                                            className="form-control"
                                            onChange={props.handleInputChange}
                                            id="Datereceived"
                                            aria-describedby="DatereceivedHelp"
                                            placeholder="Enter Datereceived"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="CertType">CertType</label>
                                        <Select
                                            name="CertType"
                                            value={props.Values.CertType}
                                            onChange={props.typechange}
                                            options={CertTypeOptions}
                                            defaultInputValue={props.Values.CertType}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Abbreviation">Abbreviation</label>
                                        <input
                                            type="text"
                                            name="Abbreviation"
                                            required
                                            value={props.Values.Abbreviation}
                                            className="form-control"
                                            onChange={props.handleInputChange}
                                            id="Abbreviation"
                                            aria-describedby="AbbreviationHelp"
                                            
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="FirstNo">FirstNo</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="FirstNo"
                                            value={props.Values.FirstNo}
                                            onChange={props.handleInputChange}
                                            placeholder="Enter FirstNo"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
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
                                        <label htmlFor="CostCenter">CostCenter</label>
                                        <Select
                                            name="CostCenter"
                                            className="form-group"
                                            defaultInputValue={props.Values.CostCenter}
                                            value={props.Values.CostCenter}
                                            onChange={props.handleSelectChange}
                                            options={CostCenteroptions}
                                        />
                                    </div>
                                  

                                    <div className="form-group">
                                        <label htmlFor="LastNo">LastNo</label>
                                        <input
                                            type="number"
                                            name="LastNo"
                                            onChange={props.handleInputChange}
                                            value={props.Values.LastNo}
                                            className="form-control"
                                            id="LastNo"
                                            aria-describedby="emailHelp"
                                            placeholder="LastNo"
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

export default ReceiveMotorCertificates;
