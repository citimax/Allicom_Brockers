import React, { Component } from "react";
import Breadcumps from "../breadcumps";
import Table from "../Table";
import TableWrapper from "../TableWrappper";
import Wrapper from "../wrapper";
import swal from "sweetalert";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],

      UserName: "",
      FullNames: "",
      Email: "",
      Password: "",
      Telephone: "",
      ConfirmPassword: "",
      ExpiryDate: "4/25/2099",
      IsActive: true
    };
  }

  fetchData = () => {
    const user = localStorage.getItem("UserData");
    fetch("api/users/" + user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(User => {
        if (User.length > 0) {
          this.setState({
            UserName: User[0].UserName,
            FullNames: User[0].FullNames,
            Email: User[0].Email,
            Password: User[0].Password,
            Telephone: User[0].Telephone,
            ConfirmPassword: User[0].ConfirmPassword,
            ExpiryDate: User[0].ExpiryDate,
            IsActive: User[0].IsActive
          });
        } else {
          swal("Oops!", User[0].message, "error");
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

  //   handleEdit = User => {
  //     const data = {
  //       UserName: User.UserName,
  //       FullNames: User.FullNames,
  //       Email: User.Email,
  //       Password: User.Password,
  //       Telephone: User.Telephone,
  //       ConfirmPassword: User.ConfirmPassword,
  //       ExpiryDate: User.ExpiryDate,
  //       IsActive: true
  //     };
  //     this.setState(data);
  //   };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      UserName: this.state.UserName,
      FullNames: this.state.FullNames,
      Email: this.state.Email,
      Password: this.state.Password,
      Telephone: this.state.Telephone,
      ConfirmPassword: this.state.ConfirmPassword,
      ExpiryDate: this.state.ExpiryDate,
      IsActive: true
    };

    this.postData("api/users", data);
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
            // this.handleStateReset();
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
  }

  render() {
    return (
      <Wrapper>
        <Breadcumps
          tablename={"Users"}
          button={
            <button
              to='/'
              type='button'
              style={{ marginTop: 40 }}
              //   onClick={this.handleclick}
              className='btn btn-primary float-left'>
              Go Back
            </button>
          }
        />

        <Formdata
          Values={this.state}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
      </Wrapper>
    );
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
                    <label htmlFor='Username'>UserName</label>
                    <input
                      type='text'
                      name='UserName'
                      value={props.Values.UserName}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter Username'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Email address</label>
                    <input
                      type='email'
                      name='Email'
                      required
                      value={props.Values.Email}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Email'
                      aria-describedby='emailHelp'
                      placeholder='Enter email'
                    />
                  </div>
                  <div className='form-group' id='data_1'>
                    <label className='font-normal'>ExpiryDate</label>
                    <div className='input-group date'>
                      <span className='input-group-addon'>
                        <i className='fa fa-calendar' />
                      </span>
                      <input
                        name='ExpiryDate'
                        type='date'
                        required
                        onChange={props.handleInputChange}
                        value={props.Values.ExpiryDate}
                        className='form-control'
                      />
                    </div>
                  </div>
                  {/* <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Password</label>
                    <input
                      name='Password'
                      type='Password'
                      required
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='exampleInputPassword1'
                      placeholder='Password'
                    />
                  </div> */}
                </div>
                <div className='col-sm'>
                  <div className='form-group'>
                    <label htmlFor='FullNames'>FullNames</label>
                    <input
                      type='text'
                      name='FullNames'
                      value={props.Values.FullNames}
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='FullNames'
                      placeholder='FullNames'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='Telephone'>Telephone</label>
                    <input
                      type='text'
                      name='Telephone'
                      value={props.Values.Telephone}
                      className='form-control'
                      onChange={props.handleInputChange}
                      id='Telephone'
                      placeholder='Telephone'
                    />
                  </div>
                  <div className='checkbox'>
                    <input
                      id='checkbox1'
                      type='checkbox'
                      name='IsActive'
                      onChange={props.handleInputChange}
                      checked={props.Values.IsActive}
                    />
                    <label htmlFor='checkbox1'>is Active</label>
                  </div>
                  {/* <div className='form-group'>
                    <label htmlFor='ConfirmPassword'>Confirm Password</label>
                    <input
                      type='password'
                      name='ConfirmPassword'
                      onChange={props.handleInputChange}
                      className='form-control'
                      id='ConfirmPassword'
                      aria-describedby='emailHelp'
                      placeholder='ConfirmPassword'
                    />
                  </div> */}
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

export default Profile;
