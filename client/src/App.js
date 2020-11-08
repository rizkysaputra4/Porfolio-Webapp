import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./components/NavBar.css";
import "./components/Wall.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "axios";

import Navbar from "./components/NavBar";
import Wall from "./components/Wall";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import MyPost from "./components/MyPost";
import Home from "./components/Home";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function App() {
  Axios.defaults.withCredentials = true;

  return (
    <Router>
      <div>
        <Navbar />

        <Route path="/" exact component={Home} />
        <Route path="/wall" component={Wall} />
        <Route path="/mypost" component={MyPost} />
        <Route path="/explore" component={Explore} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
