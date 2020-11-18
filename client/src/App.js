import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./components/style/NavBar.css";
import "./components/style/Wall.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Wall from "./components/Wall";
import Explore from "./components/Explore";

import DisplayMovies from "./components/explore-component/Display-movies";
import MovieDetails from "./components/explore-component/Movie-details";
import SearchPage from "./components/explore-component/Search-page";

import Home from "./components/Home";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./components/style/movie-details.css";

function App() {
  Axios.defaults.withCredentials = true;

  return (
    <Router>
      <div>
        <Navbar />

        <Route path="/" exact component={Home} />
        <Route path="/wall" component={Wall} />
        <Route path="/explore" component={Explore} />
        <Route path="/movies" component={DisplayMovies} />
        <Route path="/search-movie/:keyword/:page" component={SearchPage} />
        <Route path="/movie/:imdbID" component={MovieDetails} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
