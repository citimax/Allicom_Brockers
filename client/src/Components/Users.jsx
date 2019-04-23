import React, { Component } from "react";
import Breadcumps from "./breadcumps";

import Tables from "./Tables";
import TableWrapper from "./TableWrapper";

class Home extends Component {
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
        label: "ID"
      },
      {
        label: "UserName"
      },
      {
        label: "FullNames"
      },
      {
        label: "Email"
      },
      {
        label: "Telephone"
      }
    ];
    let itemlist = [];
    this.state.users.map((d, i) => {
      let list = {
        ID: i + 1,
        Username: d.UserName,
        FullName: d.FullNames,
        Email: d.Email,
        Telephone: d.Telephone
      };

      itemlist.push(list);
    });

    return (
      <div id="wrapper">
        <div id="page-wrapper" className="gray-bg">
         
          <Breadcumps tablename={"Users"} />
          <TableWrapper>
            <Tables
              users={this.state.users}
              Rows={itemlist}
              columns={ColumnData}
            />
          </TableWrapper>
        </div>
      </div>
    );
  }
}

export default Home;
