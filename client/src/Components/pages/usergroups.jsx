import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";

class UserGroups extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    fetchData = () => {
        fetch("api/users")
            .then(res => res.json())
            .then(Users => {
                this.setState({ users: Users });
            });
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const ColumnData = [
            {
                label: "UserName",
                field: "UserName",
                sort: "asc",
                width: 250
            },
            {
                label: "FullNames",
                field: "FullNames",
                sort: "asc",
                width: 270
            },
            {
                label: "Email",
                field: "Email",
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
                label: "Phone",
                field: "Phone",
                sort: "asc",
                width: 200
            }
        ];
        const Rowdata1 = [];
        const rows = [...this.state.users];
        rows.map(function (k) {
            const Rowdata = {
                username: k.UserName,
                FullNames: k.FullNames,
                Email: k.Email,
                Telephone: k.Telephone,
                Phone: k.Phone,
                action: <a href=''>Edit</a>
            };
            Rowdata1.push(Rowdata);
        });

        return (
            <Wrapper>
                <Breadcumps tablename={"User Groups"} />
                <TableWrapper>
                    <Table Rows={Rowdata1} columns={ColumnData} />
                </TableWrapper>
            </Wrapper>
        );
    }
}

const Formdata = () => {
    return <div />;
};

export default UserGroups;
