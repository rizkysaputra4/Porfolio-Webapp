import React, { Component } from "react";
import { Link } from "react-router-dom";

//import img from "../pic/HomeBtn.png"

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <nav className="navbar fixed-top navbar-light bg-primary text-white">
          <div className="nav-left-box" id="home-btn">
            <Link to="/" className="NavList">
              Home
            </Link>
          </div>
          <div className="nav-right-box">
            <Link to="/wall" className="NavList">
              Wall
            </Link>

            <Link to="/explore" className="NavList">
              Explore
            </Link>

            <Link to="/profile" className="NavList">
              Profile
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
