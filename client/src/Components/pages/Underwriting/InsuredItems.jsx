import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";

import swal from "sweetalert";
import Select from "react-select";

class InsuredItems extends Component {
    constructor() {
        super();
        this.state = {
            InsuredItems: [],
            Members: [],
            Principlemember:"",
            MotorVehicle:"",
            Familymembers:[],
            MotorVehicles:[],
            MemberNo: "",
            ItemType: "",
            ItemReffNo: "",
            ItemDesc: "",
            Narration: "",           
            TotalSumInsured: "",          
            DMSDocRef: "",
          
           
        };
    }
    fetchMotorVehicles = () => {
        fetch("api/motorvehicle", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ MotorVehicles: data });
                } else {
                    swal("Oops!", data.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    fetchFamilyMembers = () => {
        fetch("api/FamilyMembers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ Familymembers: data });
                } else {
                    swal("Oops!", data.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    fetchMembers = () => {
        fetch("api/clients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ Members: data });
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
            MemberNo: "",
            ItemType: "",
            ItemReffNo: "",
            ItemDesc: "",
            Narration: "",         
            DMSDocRef: ""
        });
    }
    fetchData = () => {
        fetch("api/InsuredItems", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(InsuredItems => {
                if (InsuredItems.length > 0) {
                    this.setState({ InsuredItems: InsuredItems });
                } else {
                    swal("Oops!", InsuredItems.message, "error");
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
                return fetch("api/InsuredItems/" + k.MemberNo + "/" + k.ItemReffNo, {
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
    handleEdit = InsuredItems => {
        this.setState(InsuredItems);
        this.setState({ reseter: true });
    };
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            MemberNo: this.state.MemberNo.value,
            ItemType: this.state.ItemType.value,
            ItemReffNo: this.state.ItemReffNo,
            ItemDesc: this.state.ItemDesc,
            Narration: this.state.Narration,           
            DMSDocRef: this.state.DMSDocRef,
            TotalSumInsured: this.state.TotalSumInsured,
            principleMember: this.state.Principlemember.value,
            MotorVehicle: this.state.MotorVehicle.value,
        };
        this.postData("/api/InsuredItems", data);
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
        this.fetchMembers();
        this.fetchFamilyMembers();
        this.fetchMotorVehicles();
        
    }

    render() {
        const ColumnData = [
           
            {
                label: "MemberNo",
                field: "MemberNo",
                sort: "asc"
            },
            {
                label: "ItemType",
                field: "ItemType",
                sort: "asc"
            },
            {
                label: "ItemReffNo",
                field: "ItemReffNo",
                sort: "asc",
                width: 200
            },
            {
                label: "Item Desc",
                field: "ItemDesc",
                sort: "asc"
               
                
            },
             {
                label: "Principlemember",
                field: "Principlemember",
                sort: "asc"
            }, 
            {
                label: "MotorVehicle",
                field: "MotorVehicle",
                sort: "asc"
            },
           
            {
                label: "Narration",
                field: "Narration"
            },           
              {
                label: "DMSDocRef",
                field: "DMSDocRef",
                sort: "asc"
            },
           {
                label: "TotalSumInsured",
                field: "TotalSumInsured",
                sort: "asc"
            }, 

            {
                label: "action",
                field: "action",
                sort: "asc"  
            }
        ];
        let Rowdata1 = [];
        const Rows = [...this.state.InsuredItems];

        if (Rows.length > 0) {
            Rows.map((k, i) => {
                let Rowdata = {
                    MemberNo: k.MemberNo,
                    ItemType: k.ItemType,
                    ItemReffNo: k.ItemReffNo,
                    ItemDesc: k.ItemDesc,
                    Principlemember: k.principleMember,
                    MotorVehicle: k.MotorVehicle,
                    Narration: k.Narration,
                    DMSDocRef: k.DMSDocRef,
                    TotalSumInsured: k.TotalSumInsured,                   
                   
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
                        tablename={"Insured items"}
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
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <Breadcumps
                        tablename={"Insured items"}
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
const Familiy = props => {
    const Familymembersoptions = [...props.Values.Familymembers].map(
        (k, i) => {
            return {
                value: k.MemberCode,
                label: k.Names + "|" + k.MemberCode
            };
        }
    );
    const MotorVehiclesoptions = [...props.Values.MotorVehicles].map(
        (k, i) => {
            return {
                value: k.RegNo,
                label: k.RegNo
            };
        }
    );
    if (props.Values.ItemType.value == "Family") {
        return (
           
                <div className="form-group">
                <label htmlFor="Principlemember">Principle Member</label>
                    <Select
                    name="Principlemember"
                        className="form-group"
                    defaultInputValue={props.Values.Principlemember}
                    value={props.Values.Principlemember}
                        onChange={props.handleSelectChange}
                    options={Familymembersoptions}
                    required
                    />
                </div>

               
           
        );
    } 
    if (props.Values.ItemType.value == "Motor Vehicle") {
        return (

            <div className="form-group">
                <label htmlFor="Principlemember">Motor Vehicle</label>
                <Select
                    name="MotorVehicle"
                    className="form-group"
                    defaultInputValue={props.Values.MotorVehicle}
                    value={props.Values.MotorVehicle}
                    onChange={props.handleSelectChange}
                    options={MotorVehiclesoptions}
                    required
                />
            </div>



        );
    } 
    else{
        return <div />;
    }
};


const Formdata = props => {
    const Membersoptions = [...props.Values.Members].map((k, i) => {
        return {
            value: k.ClientCode.toString(),
            label: k.ClientName.toString() + k.ClientCode.toString(),
        };
    });
    const ItemTypeOptions = [
        {
            value: "General Description",
            label: "General Description"
        },
        {
            value: "Motor Vehicle",
            label: "Motor Vehicle(s)"
        }
        ,
        {
            value: "Family",
            label: "Family"
        }
    ];
  
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
                                        <label htmlFor="DMSDocRef">MemberNo</label>
                                        <Select
                                            name="MemberNo"
                                            className="form-group"
                                            defaultInputValue={props.Values.MemberNo}
                                            value={props.Values.MemberNo}
                                            onChange={props.handleSelectChange}
                                            options={Membersoptions}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ItemType">ItemType</label>
                                        <Select
                                            name="ItemType"
                                            defaultInputValue={props.Values.ItemType}
                                            value={props.Values.ItemType}
                                            onChange={props.handleSelectChange}
                                            options={ItemTypeOptions}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ItemReffNo">Item Refference No</label>
                                        <input
                                            type="text"
                                            name="ItemReffNo"
                                            value={props.Values.ItemReffNo}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="exampleInputRenewable1"
                                            aria-describedby="ItemReffNoHelp"
                                            placeholder="Enter ItemReffNo"
                                            required
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="DMSDocRef">DMSDocRef</label>
                                        <input
                                            type="text"
                                            name="DMSDocRef"
                                            value={props.Values.DMSDocRef}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="DMSDocRef"
                                            placeholder="DMSDocRef"
                                            required
                                        />
                                    </div>
                                   
                                </div>
                                <div className="col-sm">
                                    <div className="form-group">
                                        <label htmlFor="ItemDesc">Item Description</label>
                                        <input
                                            type="text"
                                            name="ItemDesc"
                                            value={props.Values.ItemDesc}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="ItemDesc"
                                            placeholder="ItemDesc"
                                            required
                                        />
                                    </div>
                                    <Familiy
                                        Values={props.Values}
                                        handleSelectChange={props.handleSelectChange}
                                                                           />
                                    <div className="form-group">
                                        <label htmlFor="TotalSumInsured">TotalSumInsured</label>
                                        <input
                                            type="number"
                                            name="TotalSumInsured"
                                            value={props.Values.TotalSumInsured}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="TotalSumInsured"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Narration">Narration </label>
                                        <textarea
                                            type="text"
                                            name="Narration"
                                            value={props.Values.Narration}
                                            onChange={props.handleInputChange}
                                            className="form-control"
                                            id="exampleInputTotalSumInsured1"
                                            aria-describedby="TotalSumInsuredHelp"
                                            placeholder="Enter Admin Fee"
                                            required
                                        />
                                    </div>
                                  
                                </div>
                                
                            </div>
                            <p />

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

export default InsuredItems;
