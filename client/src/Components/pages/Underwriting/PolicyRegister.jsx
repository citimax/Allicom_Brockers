import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import swal from "sweetalert";
import Select from "react-select";
import { object } from "prop-types";

class PolicyRegister extends Component {
    constructor() {
        super();
        this.state = {  
            Policy: [],
            DepartmentOptions: [],
            PolicyClassOptions:[],
            CostCenter: "",
            PolicyNo: "",
            Client: "",
            Agent: "",
            PolicyClass: "",
            InsuredItem: "",
            Department: "",
            InsuredPIN: "",
            Occupation: "",
            ProposalNo: "",
            FromDate: "",
            ToDate: "",
            DaysOnCover: "",
            RenewalDate: "",
            DocRef: "",
            InsuranceCompany: "",
            SumInsured: "",
            Calculator: "",
            PremiumRateType: "",
            PremiumRate: "",
            BasicPremium: "",
            StampDuty: "",
            TrainingLevy: "",
            PolicyHCF: "",
            OtherCharges: "",
            PolicyCharges: "",
            BrokerDiscount: "",
            CommRate: "",
            Commission: "",
            WithholdingTaxRate: "",
            WithholdingTaxAmount: "",
            AgentComm: "",
            AgentCommAmount: "",
            AdminFeeRate: "0",
            AdminAmount: "0",
            PayableAmount: "",
            ToInsurer: "",
            ACBranch: "",
            PolicyStatus: ""
            
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
           ClientOptions:[],
            CostCenter: "",
            PolicyNo: "",
            Client: "",
            Agent: "",
            PolicyClass: "",
            InsuredItem: "",
            Department: "",
            InsuredPIN: "",
            Occupation: "",
            ProposalNo: "",
            FromDate: "",
            ToDate: "",
            DaysOnCover: "",
            RenewalDate: "",
            DocRef: "",
            InsuranceCompany: "",
            SumInsured: "",
            Calculator: "",
            PremiumRateType: "",
            PremiumRate: "",
            BasicPremium: "",
            StampDuty: "",
            TrainingLevy: "",
            PolicyHCF: "",
            OtherCharges: "",
            PolicyCharges: "",
            BrokerDiscount: "",
            CommRate: "",
            Commission: "",
            WithholdingTaxRate: "",
            WithholdingTaxAmount: "",
            AgentComm: "",
            AgentCommAmount: "",
            AdminFeeRate: "0",
            AdminAmount: "0",
            PayableAmount: "",
            ToInsurer: "",
            ACBranch: "",
            PolicyStatus: ""
        });
    }
    fetchData = () => {
        fetch("api/policyregister", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Policy => {
                if (Policy.length > 0) {
                    this.setState({ Policy });
                } else {
                    swal("Oops!", Policy.message, "error");
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

    fetchClients = () => {
        fetch("api/clients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ClientOptions => {
                if (ClientOptions.length > 0) {
                    this.setState({ ClientOptions });
                } else {
                    swal("Oops!", ClientOptions.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    fetchDepartment = () => {
        fetch("api/department", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(DepartmentOptions => {
                if (DepartmentOptions.length > 0) {
                    this.setState({ DepartmentOptions });
                } else {
                    swal("Oops!", DepartmentOptions.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    // fetchInsuredItems = () => {
    //     fetch("api/department", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-access-token": localStorage.getItem("token")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(DepartmentOptions => {
    //             if (DepartmentOptions.length > 0) {
    //                 this.setState({ DepartmentOptions });
    //             } else {
    //                 swal("Oops!", DepartmentOptions.message, "error");
    //             }
    //         })
    //         .catch(err => {
    //             swal("Oops!", err.message, "error");
    //         });
    // };
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
    fetchPolicyClasses = () => {
        fetch("api/PolicyClasses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PolicyClassOptions => {
                if (PolicyClassOptions.length > 0) {
                    this.setState({ PolicyClassOptions });
                } else {
                    swal("Oops!", PolicyClassOptions.message, "error");
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
                return fetch("api/policyregister/" + client.ClientCode, {
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
        
        const data =  {
            CostCenter: this.state.CostCenter,
            PolicyNo: this.state.PolicyNo,
            Client: this.state.Client,
            Agent: this.state.Agent,
            PolicyClass: this.state.PolicyClass,
            InsuredItem: this.state.InsuredItem,
            Department: this.state.Department,
            InsuredPIN: this.state.InsuredPIN,
            Occupation: this.state.Occupation,
            ProposalNo: this.state.ProposalNo,
            FromDate: this.state.FromDate,
            ToDate: this.state.ToDate,
            DaysOnCover: this.state.DaysOnCover,
            RenewalDate: this.state.RenewalDate,
            DocRef: this.state.DocRef,
            InsuranceCompany: this.state.InsuranceCompany,
            SumInsured: this.state.SumInsured,
            Calculator: this.state.Calculator,
            PremiumRateType: this.state.PremiumRateType,
            PremiumRate: this.state.PremiumRate,
            BasicPremium: this.state.BasicPremium,
            StampDuty: this.state.StampDuty,
            TrainingLevy: this.state.TrainingLevy,
            PolicyHCF: this.state.PolicyHCF,
            OtherCharges: this.state.OtherCharges,
            PolicyCharges: this.state.PolicyCharges,
            BrokerDiscount: this.state.BrokerDiscount,
            CommRate: this.state.CommRate,
            Commission: this.state.Commission,
            WithholdingTaxRate: this.state.WithholdingTaxRate,
            WithholdingTaxAmount: this.state.WithholdingTaxAmount,
            AgentComm: this.state.AgentComm,
            AgentCommAmount: this.state.AgentCommAmount,
            AdminFeeRate: this.state.AdminFeeRate,
            AdminAmount: this.state.AdminAmount,
            PayableAmount: this.state.PayableAmount,
            ToInsurer: this.state.ToInsurer,
            ACBranch: this.state.ACBranch,
            PolicyStatus: this.state.PolicyStatus
        }

        this.postData("api/policyregister", data);
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
        this.fetchClients();
        this.fetchDepartment();
        this.fetchPolicyClasses();
    }
    
    render() {
       
        const ColumnData = [
            {
                label: "CostCenter",
                field: "CostCenter",
                sort: "asc",
                width: 200
            },
            {
                label: "PolicyNo",
                field: "PolicyNo",
                sort: "asc",
                width: 200
            },
            {
                label: "Client",
                field: "Client",
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
                label: "Policy Class",
                field: "PolicyClass",
                sort: "asc",
                width: 200
            },
            {
                label: "InsuredItem",
                field: "InsuredItem",
                sort: "asc",
                width: 200
            },
            {
                label: "Department",
                field: "Department",
                sort: "asc",
                width: 200
            },
            {
                label: "Insured PIN",
                field: "InsuredPIN",
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
                label: "Proposal No",
                field: "ProposalNo",
                sort: "asc",
                width: 200
            }
            ,
            {
                label: "FromDate",
                field: "FromDate",
                sort: "asc",
                width: 200
            },
            {
                label: "ToDate",
                field: "ToDate",
                sort: "asc",
                width: 200
            },
            {
                label: "DaysOnCover",
                field: "DaysOnCover",
                sort: "asc",
                width: 200
            }, 
            {
                label: "RenewalDate",
                field: "RenewalDate",
                sort: "asc",
                width: 200
            },
            {
                label: "DocRef",
                field: "DocRef",
                sort: "asc",
                width: 200
            },
            {
                label: "Insurance Company",
                field: "InsuranceCompany",
                sort: "asc",
                width: 200
            },
            {
                label: "SumInsured",
                field: "SumInsured",
                sort: "asc",
                width: 200
            },
            {
                label: "Calculator",
                field: "Calculator",
                sort: "asc",
                width: 200
            },
            {
                label: "Premium RateType",
                field: "PremiumRateType",
                sort: "asc",
                width: 200
            },
            {
                label: "PremiumRate",
                field: "PremiumRate",
                sort: "asc",
                width: 200
            },
            {
                label: "BasicPremium",
                field: "BasicPremium",
                sort: "asc",
                width: 200
            },
            {
                label: "Stamp Duty",
                field: "StampDuty",
                sort: "asc",
                width: 200
            },
            {
                label: "Training Levy",
                field: "TrainingLevy",
                sort: "asc",
                width: 200
            },
            {
                label: "PolicyHCF",
                field: "PolicyHCF",
                sort: "asc",
                width: 200
            },
            
            {
                label: "Other Charges",
                field: "OtherCharges",
                sort: "asc",
                width: 200
            },
            {
                label: "Policy Charges",
                field: "PolicyCharges",
                sort: "asc",
                width: 200
            },
            {
                label: "BrokerDiscount",
                field: "BrokerDiscount",
                sort: "asc",
                width: 200
            },
            {
                label: "Comm Rate",
                field: "CommRate",
                sort: "asc",
                width: 200
            }, 
            {
                label: "Commission",
                field: "Commission",
                sort: "asc",
                width: 200
            },
             {
                label: "W/TaxRate",
                field: "WithholdingTaxRate",
                sort: "asc",
                width: 200
            },
              {
                label: "W/TaxAmount",
                field: "WithholdingTaxAmount",
                sort: "asc",
                width: 200
            },
            {
                label: "Agent Comm",
                field: "AgentComm",
                sort: "asc",
                width: 200
            },
            {
                label: "Agent Comm Amount",
                field: "AgentCommAmount",
                sort: "asc",
                width: 200
            },
            {
                label: "AdminFee Rate",
                field: "AdminFeeRate",
                sort: "asc",
                width: 200
            },
            {
                label: "Admin Amount",
                field: "AdminAmount",
                sort: "asc",
                width: 200
            }, 
            {
                label: "PayableAmount",
                field: "PayableAmount",
                sort: "asc",
                width: 200
            },
            {
                label: "To Insurer",
                field: "ToInsurer",
                sort: "asc",
                width: 200
            },
            {
                label: "ACBranch",
                field: "ACBranch",
                sort: "asc",
                width: 200
            },
            {
                label: "PolicyStatus",
                field: "PolicyStatus",
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
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        
       
        let Rowdata1 = [];
        const Rows = [...this.state.Policy];

        if (Rows.length > 0) {
            Rows.map(( k, i) => {
                let Rowdata={
                    CostCenter: k.CostCenter,
                    PolicyNo:k.PolicyNo,
                    Client:k.Client,
                    Agent:k.Agent,
                    PolicyClass:k.PolicyClass,
                    InsuredItem:k.InsuredItem,
                    Department:k.Department,
                    InsuredPIN:k.InsuredPIN,
                    Occupation:k.Occupation,
                    ProposalNo: k.ProposalNo,
                    FromDate: k.FromDate,
                    ToDate:k.ToDate,
                    DaysOnCover:k.DaysOnCover,
                    RenewalDate:k.RenewalDate,
                    DocRef:k.DocRef,
                    InsuranceCompany:k.InsuranceCompany,
                    SumInsured:k.SumInsured,
                    Calculator:k.Calculator,
                    PremiumRateType:k.PremiumRateType,
                    PremiumRate:k.PremiumRate,
                    BasicPremium:k.BasicPremium,
                    StampDuty:k.StampDuty,
                    TrainingLevy:k.TrainingLevy,
                    PolicyHCF:k.PolicyHCF,
                    OtherCharges:k.OtherCharges,
                    PolicyCharges:k.PolicyCharges,
                    BrokerDiscount:k.BrokerDiscount,
                    CommRate:k.CommRate,
                    Commission:k.Commission,
                    WithholdingTaxRate:k.WithholdingTaxRate,
                    WithholdingTaxAmount:k.WithholdingTaxAmount,
                    AgentComm:k.AgentComm,
                    AgentCommAmount:k.AgentCommAmount,
                    AdminFeeRate:k.AdminFeeRate,
                    AdminAmount:k.AdminAmount,
                    PayableAmount:k.PayableAmount,
                    ToInsurer:k.ToInsurer,
                    ACBranch:k.ACBranch,
                    PolicyStatus: k.PolicyStatus,  
                    Currency:"KES",
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
                        tablename={"Add Policy"}
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
                        tablename={"Policy Register"}
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
    const ClientOptions = [...props.Values.ClientOptions].map((k, i) => {
        return {
            value: k.ClientCode,
            label: k.ClientName + ' |' + k.ClientCode
        };
    });
    const DepartmentOptions = [...props.Values.DepartmentOptions].map((k, i) => {
        return {
            value: k.Code,
            label: k.Name + ' |' + k.Code
        };
    });
    const PolicyClassOptions = [...props.Values.PolicyClassOptions].map((k, i) => {
        return {
            value: k.PolicyCode,
            label: k.PolicyName + ' |' + k.PolicyCode
        };
    });
    const StatusOptions = [
        { value: 'Current', label: 'Current' },
        { value: 'Suspended', label: 'Suspended' },
        { value: 'Cancelled', label: 'Cancelled' },
        { value: 'Lapsed', label: 'Lapsed' },
    ]
    const CalculatorOptions = [
        { value: 'Standard calculator', label: 'Standard calculator' },
        { value: 'Detailed calculator', label: 'Detailed calculator' },
       
    ]
    const PremiumRateType = [
        { value: 'Percent', label: 'Percent' },
        { value: 'Per Mille', label: 'Per Mille' },
        { value: 'No Rate', label: 'No Rate' },

    ]
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
                        <form   onSubmit={props.handleSubmit} role="form">
                            <div className="row">
                                
                                <div class="form-group col-sm-3 my-1" ><label>CostCenter</label> <input type="text" name='CostCenter' value={props.Values.CostCenter} onChange={props.handleInputChange} id="Enter CostCenter" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Policy No</label> <input type="text" name='PolicyNo' value={props.Values.PolicyNo} onChange={props.handleInputChange} id="Enter Policy No" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Client</label> <Select options={ClientOptions} name='Client' value={props.Values.Client} onChange={props.handleSelectChange} id="Enter Client" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Agent</label> <Select options={AgentOptions} name='Agent' value={props.Values.Agent} onChange={props.handleSelectChange} id="Enter Agent"  /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>Policy Class</label> <Select name='PolicyClass' value={props.Values.PolicyClass} onChange={props.handleSelectChange} id="Enter Policy Class" options={PolicyClassOptions} /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Insured Item</label> <input type="text" name='InsuredItem' value={props.Values.InsuredItem} onChange={props.handleInputChange} id="Enter Insured Item" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Department</label> <Select options={DepartmentOptions} name='Department' value={props.Values.Department} onChange={props.handleSelectChange} id="Enter Department"  /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Insured's PIN</label> <input type="text" name='InsuredPIN' value={props.Values.InsuredPIN} onChange={props.handleInputChange} id="Enter Insured PIN" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Occupation</label> <input type="text" name='Occupation' value={props.Values.Occupation} onChange={props.handleInputChange} id="Enter Occupation" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>ProposalNo</label> <input type="text" name='ProposalNo' value={props.Values.ProposalNo} onChange={props.handleInputChange} id="Enter ProposalNo" className="form-control" /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>FromDate</label> <input type="date" name='FromDate' value={props.Values.FromDate} onChange={props.handleInputChange} id="Enter FromDate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>ToDate</label> <input type="date" name='ToDate' value={props.Values.ToDate} onChange={props.handleInputChange} id="Enter ToDate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>DaysOnCover</label> <input type="number" name='DaysOnCover' value={props.Values.DaysOnCover} onChange={props.handleInputChange} id="Enter DaysOnCover" className="form-control" /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>Renewal Date</label> <input type="date" name='RenewalDate' value={props.Values.RenewalDate} onChange={props.handleInputChange} id="Enter RenewalDate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Doc Ref</label> <input type="text" name='DocRef' value={props.Values.DocRef} onChange={props.handleInputChange} id="Enter DocRef" className="form-control" /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>Insurance Company</label> <input type="text" name='InsuranceCompany' value={props.Values.InsuranceCompany} onChange={props.handleInputChange} id="Enter Insurance Company" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Sum Insured</label> <input type="text" name='SumInsured' value={props.Values.SumInsured} onChange={props.handleInputChange} id="Enter Sum Insured" className="form-control" /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>Calculator</label> <Select name='Calculator' value={props.Values.Calculator} onChange={props.handleSelectChange} id="Enter Calculator" options={CalculatorOptions} /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Premium Rate Type</label> <Select options={PremiumRateType} name='PremiumRateType' value={props.Values.PremiumRateType} onChange={props.handleSelectChange} id="Enter Premium Rate Type"  /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>PremiumRate</label> <input type="number" name='PremiumRate' value={props.Values.PremiumRate} onChange={props.handleInputChange} id="Enter PremiumRate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>BasicPremium</label> <input type="number" name='BasicPremium' value={props.Values.BasicPremium} onChange={props.handleInputChange} id="Enter BasicPremium" className="form-control" /></div>    
                                <div class="form-group col-sm-3 my-1" ><label>StampDuty</label> <input type="number" name='StampDuty' value={props.Values.StampDuty} onChange={props.handleInputChange} id="Enter StampDuty" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Training Levy</label> <input type="number" name='TrainingLevy' value={props.Values.TrainingLevy} onChange={props.handleInputChange} id="Enter TrainingLevy" className="form-control" /></div>   
                                <div class="form-group col-sm-3 my-1" ><label>Policy HCF</label> <input type="number" name='PolicyHCF' value={props.Values.PolicyHCF} onChange={props.handleInputChange} id="Enter PolicyHCF" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Other Charges</label> <input type="number" name='OtherCharges' value={props.Values.OtherCharges} onChange={props.handleInputChange} id="Enter OtherCharges" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Policy Charges</label> <input type="number" name='PolicyCharges' value={props.Values.PolicyCharges} onChange={props.handleInputChange} id="Enter PolicyCharges" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Broker Discount</label> <input type="number" name='BrokerDiscount' value={props.Values.BrokerDiscount} onChange={props.handleInputChange} id="Enter BrokerDiscount" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Comm Rate(%)</label> <input type="number" name='CommRate' value={props.Values.CommRate} onChange={props.handleInputChange} id="Enter CommRate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Commission</label> <input type="number" name='Commission' value={props.Values.Commission} onChange={props.handleInputChange} id="Enter Commission" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>W/TaxRate (%)</label> <input type="number" name='WithholdingTaxRate' value={props.Values.WithholdingTaxRate} onChange={props.handleInputChange} id="Enter Withholding Tax Rate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>W/TaxAmount</label> <input type="number" name='WithholdingTaxAmount' value={props.Values.WithholdingTaxAmount} onChange={props.handleInputChange} id="Enter Withholding Tax Amount" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Agent Comm(%)</label> <input type="number" name='AgentComm' value={props.Values.AgentComm} onChange={props.handleInputChange} id="Enter AgentComm" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Agent Comm Amount</label> <input type="number" name='AgentCommAmount' value={props.Values.AgentCommAmount} onChange={props.handleInputChange} id="Enter Agent Comm Amount" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Admin Fee Rate(%)</label> <input type="number" name='AdminFeeRate' value={props.Values.AdminFeeRate} onChange={props.handleInputChange} id="Enter Admin Fee Rate" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Admin Amount</label> <input type="number" name='AdminAmount' value={props.Values.AdminAmount} onChange={props.handleInputChange} id="Enter Admin Amount" className="form-control" /></div>  
                                {/* <div class="form-group col-sm-3 my-1" ><label>Client</label> <input type="text" name='Client' value={props.Values.Client} onChange={props.handleInputChange} id="Enter Client" className="form-control" /></div> */}
                                <div class="form-group col-sm-3 my-1" ><label>Payable Amount</label> <input type="number" name='PayableAmount' value={props.Values.PayableAmount} onChange={props.handleInputChange} id="Enter PayableAmount" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>To Insurer</label> <input type="number" name='ToInsurer' value={props.Values.ToInsurer} onChange={props.handleInputChange} id="Enter ToInsurer" className="form-control" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>AC/Branch</label> <input type="text" name='ACBranch' value={props.Values.ACBranch} onChange={props.handleInputChange} id="Enter ACBranch" className="form-control" /></div> 
                                <div class="form-group col-sm-3 my-1" ><label>Policy Status</label> <Select options={StatusOptions} name='PolicyStatus' value={props.Values.PolicyStatus} onChange={props.handleSelectChange} id="Enter PolicyStatus" /></div>
                                <div class="form-group col-sm-3 my-1" ><label>Currency</label> <Select  name='Currency' value={props.Values.Currency} onChange={props.handleSelectChange} options={CurrencyDataOtions} /></div>
                                
                                
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

export default PolicyRegister;
