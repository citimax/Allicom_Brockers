import React, { Component } from 'react';
import NavTop from './nav_top'
import Breadcumps from './breadcumps'
import Footer from './footer'
import Table from './tables'

class wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        }
    }
    // componentDidMount(){
    //     fetch('api/users')
    //      .then(res =>res.json())
    //      .then(users => this.setState({ users}))
    // }
    render() {
        return (
            <div id="page-wrapper" className="gray-bg">
                <NavTop/>
                <Breadcumps/>
                <Table  />
                <Footer />

            </div>

        );
    }
}

export default wrapper;