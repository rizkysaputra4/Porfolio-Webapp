import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <nav className="navbar navbar-light bg-white text-dark" id="navbar">
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
          </div>
        </nav>
      </div>
    );
  }
}
