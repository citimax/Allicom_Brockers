import React, { Component } from "react";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remeberme: false,
      redirect: false
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    this.postData("api/login", data);
  };

  postData(url = ``, data = {}, req, res) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("UserData", data.userdata);
            {
              this.setRedirect();
            }
          } else {
            swal("error!", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/users' />;
    }
  };

  render() {
    return (
      <div className='wrapper wrapper-content animated fadeInRight mt-80'>
        <div className='clearfix' />
        <div className='row'>
          <div className='col-sm-6 offset-sm-3 mt-9'>
            <div className='ibox '>
              <div className='ibox-title'>
                <h5>Welcome to Allicom Broker System</h5>
                <div className='ibox-tools'>
                  <a className='collapse-link'>
                    <i className='fa fa-chevron-up' />
                  </a>
                  <a
                    className='dropdown-toggle'
                    data-toggle='dropdown'
                    href='#'>
                    <i className='fa fa-wrench' />
                  </a>
                  <ul className='dropdown-menu dropdown-user'>
                    <li>
                      <a href='#' className='dropdown-item'>
                        Config option 1
                      </a>
                    </li>
                    <li>
                      <a href='#' className='dropdown-item'>
                        Config option 2
                      </a>
                    </li>
                  </ul>
                  <a className='close-link'>
                    <i className='fa fa-times' />
                  </a>
                </div>
              </div>
              <div className='ibox-content'>
                <div className='row'>
                  <div className='col-sm-6 b-r'>
                    <h3 className='m-t-none m-b'>Sign in</h3>
                    <p>Sign in today for more expirience.</p>
                    <form
                      onSubmit={this.handleSubmit}
                      role='form'
                      className='form-inlin justify-content-center'>
                      <div className='form-group'>
                        <label>Username</label>{" "}
                        <input
                          onChange={this.handleInputChange}
                          type='text'
                          name='username'
                          value={this.state.username}
                          placeholder='Enter username'
                          className='form-control'
                        />
                      </div>
                      <div className='form-group'>
                        <label>Password</label>{" "}
                        <input
                          onChange={this.handleInputChange}
                          value={this.state.password}
                          type='password'
                          name='password'
                          placeholder='Password'
                          className='form-control'
                        />
                      </div>
                      <div>
                        <button
                          className='btn btn-sm btn-primary float-right m-t-n-xs'
                          type='submit'>
                          <strong>Log in</strong>
                        </button>
                        <label>
                          {" "}
                          <input
                            type='checkbox'
                            name='remeberme'
                            onChange={this.handleInputChange}
                            value={this.state.remeberme}
                            className='i-checks'
                          />{" "}
                          Remember me{" "}
                        </label>
                        {this.renderRedirect()}
                      </div>
                    </form>
                  </div>
                  <div className='col-sm-6'>
                    <h4>Not a member?</h4>
                    <p>You can create an account:</p>
                    <p className='text-center'>
                      <a href='#'>
                        <i className='fa fa-sign-in big-icon' />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
