import React from "react";
import axios from "axios";
import { registerValidation, loginValidation } from "./validation";

export default class AuthHandler extends React.Component {
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
      isLoggedIn: false,
      loginError: "",
      registerError: "",
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

            {this.displayLoginError()}

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

  onSubmitLogin = (e) => {
    e.preventDefault();

    const loginProps = {
      email: this.state.email,
      password: this.state.password,
    };

    const { error } = loginValidation(loginProps);

    if (error) {
      this.setState({ loginError: error.details[0].message });
    } else {
      axios
        .post(`${this.props.server}/login`, loginProps)
        .then((res) => {
          console.log(res.data.login);
          if (res.data.login === "success") {
            this.setState({
              email: "",
              password: "",
            });
            window.location.reload();
          } else {
            this.setState({ loginError: res.data });
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
            {this.displayRegisterError()}
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

  onSubmitRegister = (e) => {
    e.preventDefault();

    const registerProps = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };

    const { error } = registerValidation(registerProps);

    if (error) {
      this.setState({ registerError: error.details[0].message });
    } else {
      axios
        .post(`${this.props.server}/signup`, registerProps)
        .then((res) => {
          if (res.data.register === "success") {
            this.setState({
              userName: "",
              email: "",
              password: "",
            });
            window.location.reload();
          } else {
            console.log("registerError:", res.data);
            this.setState({ registerError: res.data });
          }
        })
        .catch((err) => console.log(err));
    }

    console.log(registerProps);
  };

  displayRegisterError() {
    if (this.state.registerError)
      return (
        <div className="alert alert-danger">{this.state.registerError}</div>
      );
  }

  displayLoginError() {
    if (this.state.loginError)
      return (
        <div className="mr-0 d-flex justify-content-center mt-2">
          <div className="alert alert-danger " id="login-error">
            {this.state.loginError}
          </div>
        </div>
      );
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
          Login
          <svg
            className="mx-2"
            id="Login-btn"
            width="24"
            height="24"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d=" M 500 1000C 167 1000 333 1000 500 1000C 500 1000 500 1000 500 1000M 625 200C 625 200 750 200 750 200C 850 200 900 250 900 350C 900 350 900 650 900 650C 900 750 850 800 750 800C 750 800 625 800 625 800C 610 800 600 790 600 775C 600 775 600 725 600 725C 600 710 610 700 625 700C 625 700 750 700 750 700C 785 700 800 685 800 650C 800 650 800 350 800 350C 800 315 785 300 750 300C 750 300 625 300 625 300C 610 300 600 290 600 275C 600 275 600 225 600 225C 600 210 610 200 625 200C 625 200 625 200 625 200M 325 246C 337 246 354 254 375 275C 375 275 550 450 550 450C 585 485 585 516 550 550C 550 550 375 725 375 725C 325 775 300 750 300 725C 300 725 300 600 300 600C 300 600 150 600 150 600C 119 600 100 588 100 550C 100 550 100 450 100 450C 100 415 117 401 150 400C 150 400 300 400 300 400C 300 400 300 275 300 275C 300 261 308 246 325 246C 325 246 325 246 325 246" />
          </svg>
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
  onClickLogOut = () => {
    axios
      .get(`${this.props.server}/logout`)
      .then((res) => console.log("logged out"))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  logOutButton() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.onClickLogOut}>
          Logout
          <svg
            className="ml-2"
            id="Logout-btn"
            width="24"
            height="24"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d=" M 250 200C 250 200 375 200 375 200C 390 200 400 210 400 225C 400 225 400 275 400 275C 400 290 390 300 375 300C 375 300 250 300 250 300C 215 300 200 315 200 350C 200 350 200 650 200 650C 200 685 215 700 250 700C 250 700 375 700 375 700C 390 700 400 710 400 725C 400 725 400 775 400 775C 400 790 390 800 375 800C 375 800 250 800 250 800C 150 800 100 750 100 650C 100 650 99 348 99 348C 99 248 150 200 250 200C 250 200 250 200 250 200M 650 246C 662 246 679 254 700 275C 700 275 875 450 875 450C 910 485 910 516 875 550C 875 550 700 725 700 725C 650 775 625 750 625 725C 625 725 625 600 625 600C 625 600 475 600 475 600C 444 600 425 588 425 550C 425 550 425 450 425 450C 425 415 442 401 475 400C 475 400 625 400 625 400C 625 400 625 275 625 275C 625 261 633 246 650 246C 650 246 650 246 650 246M 312 1000C 292 1000 333 1000 500 1000C 417 1000 333 1000 312 1000C 312 1000 312 1000 312 1000" />
          </svg>
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
    return (
      <div>
        <div className="text-center mt-1">{this.logoutOrLoginButton()}</div>
        <p id="login-status">Logged in as {this.props.userName}</p>
      </div>
    );
  }
}
