import React, { Component } from "react";
import axios from "axios";

const server = "http://localhost:5000/api";

export default class AuthHandler extends Component {
  constructor(props) {
    super(props);

    this.onChangeLoginEmail = this.onChangeLoginEmail.bind(this);
    this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);

    this.onChangeRegisterUsername = this.onChangeRegisterUsername.bind(this);
    this.onChangeRegisterEmail = this.onChangeRegisterEmail.bind(this);
    this.onChangeRegisterPassword = this.onChangeRegisterPassword.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);

    this.state = {
      email: "",
      password: "",
      userName: "",
    };
  }

  //////////login//////////////
  onChangeLoginEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeLoginPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  loginForm() {
    return (
      <div className="card card-body mb-5">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Login
          </h5>
        </div>
        <div className="modal-body">
          <form onSubmit={this.onSubmitLogin}>
            <div className="form-group">
              <label htmlFor="login-email" className="col-form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="login-email"
                required
                value={this.state.email}
                onChange={this.onChangeLoginEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password" className="col-form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="login-password"
                required
                value={this.state.password}
                onChange={this.onChangeLoginPassword}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" value="send" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onSubmitLogin(e) {
    e.preventDefault();

    const loginProps = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(`${server}/login`, loginProps)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({
      email: "",
      password: "",
    });

    console.log(loginProps);
  }

  //////////Register///////////
  onChangeRegisterUsername(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  onChangeRegisterEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeRegisterPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  registerForm() {
    return (
      <div className="card card-body mb-5">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Register
          </h5>
        </div>
        <div className="modal-body">
          <form onSubmit={this.onSubmitRegister}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                required
                value={this.state.userName}
                onChange={this.onChangeRegisterUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                required
                value={this.state.email}
                onChange={this.onChangeRegisterEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                required
                value={this.state.password}
                onChange={this.onChangeRegisterPassword}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="sumbit" value="send" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onSubmitRegister(e) {
    e.preventDefault();

    const registerProps = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(`${server}/signup`, registerProps)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({
      userName: "",
      email: "",
      password: "",
    });

    console.log(registerProps);
  }

  loginRegisterModalBox() {
    return (
      <div>
        <div className="modal-dialog">
          <div className="modal-content modal-dialog-centered" id="myGroup">
            <div className="justify-content-center mx-auto mt-1">
              <h5 className=" mt-4 text-center">Click Below to</h5>
              <div className="d-flex mt-4 mb-4">
                <a
                  className="btn btn-primary"
                  data-toggle="collapse"
                  href="#login"
                  role="button"
                  aria-expanded="false"
                  aria-controls="login"
                >
                  Log In
                </a>
                <h5 className="ml-3 mr-3 mt-1"> Or </h5>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  data-target="#signup"
                  aria-expanded="false"
                  aria-controls="signup"
                >
                  Register
                </button>
              </div>
            </div>
            <div className="collapse" id="login" data-parent="#myGroup">
              {this.loginForm()}
            </div>
            <div className="collapse" id="signup" data-parent="#myGroup">
              {this.registerForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  LogRegModalButton() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@getbootstrap"
        >
          Login/Register
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {this.loginRegisterModalBox()}
        </div>
      </div>
    );
  }

  //////////LOG OUT////////////
  onClickLogOut(e) {
    e.preventDefault();

    axios
      .get(`${server}/logout`)
      .then((res) => console.log("logged out"))
      .catch((err) => console.log(err));
  }

  logOutButton() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.onClickLogOut}>
          Log Out
        </button>
      </div>
    );
  }

  //////////LOGOUT LOGIN BUTTON TRANSITION/////////////////
  logoutOrLoginButton() {
    if (this.props.isLoggedIn) {
      return this.logOutButton();
    } else {
      return this.LogRegModalButton();
    }
  }

  render() {
    return <div className="text-center mt-4">{this.logoutOrLoginButton()}</div>;
  }
}
