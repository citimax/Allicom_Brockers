import React, { Component } from "react";

import { Link } from "react-router-dom";
class breadcumps extends Component {
 
  render() {
    return (
      <div>
        <div className='row wrapper border-bottom white-bg page-heading'>
          <div className='col-lg-10'>
            <h2>{this.props.tablename}</h2>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='breadcrumb-item'>
                <a>{this.props.tablename}</a>
              </li>
              <li className='breadcrumb-item active'>
                <strong>{this.props.tablename} list</strong>
              </li>
            </ol>
          </div>
          <div className='col-lg-2'>
            <div className="row wrapper ">
             {/* {this.props.Button} */}
              <button to="/" type="button" style={{ marginTop: 40 }} onClick={()=>this.props.newClick()} className="btn btn-primary float-left">Create New</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default breadcumps;
