import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

const server = "http://localhost:5000/api";

export default class Home extends Component {
  /* constructor(props) {
    super(props);

    this.state = {
      loginStats: false,
    };
  } */

  componentDidMount() {
    axios
      .get(`${server}/checkLogin`)
      .then((res) => {
        console.log(res.data);
        if (!res.data.login) {
          console.log("generate token");
          axios.get(`${server}/generateGuestToken`).then((res) => {
            console.log(res.data);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <p>this is Home</p>
      </div>
    );
  }
}
