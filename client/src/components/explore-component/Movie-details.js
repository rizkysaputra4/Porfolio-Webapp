import React from "react";
import axios from "axios";
import SearchMovie from "./Search-movie";
import "../style/movie-details.css";
import ReactLoading from "react-loading";
import { server } from "../Wall";

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`${server}/getmovie/${this.props.match.params.imdbID}`)
      .then((res) => {
        this.setState({ movie: res.data, isLoading: false });
      })
      .catch((err) => console.log(err));

    window.scrollTo(0, 0);
  }

  ratings = () => {
    const movie = this.state.movie;
    if (movie.Ratings) {
      return movie.Ratings.map((rating, index) => {
        return (
          <p key={index}>
            {rating.Source}: {rating.Value}
          </p>
        );
      });
    }
  };

  movieInfo = () => {
    const movie = this.state.movie;
    const keys = [
      "Genre",
      "Director",
      "Writer",
      "Actors",
      "Runtime",
      "Released",
    ];
    const information = [
      movie.Genre,
      movie.Director,
      movie.Writer,
      movie.Actors,
      movie.Runtime,
      movie.Released,
    ];

    return information.map((info, index) => {
      return (
        <div className=" d-flex" key={index}>
          <div className=" key-movie" id="daf">
            {keys[index]}
          </div>
          <div className=" pl-1 pr-0 dot-movie">:</div>
          <div className=" val-movie">{info}</div>
        </div>
      );
    });
  };

  displayDetails = () => {
    const movie = this.state.movie;
    return (
      <div
        className="container w-75 movie-container mt-0 p-4"
        id="movie-detail"
      >
        <h3>
          {movie.Title} ({movie.Year})
        </h3>
        <p className="badge badge-pill badge-secondary">{movie.Rated} </p>
        <p className="badge badge-pill badge-secondary">{movie.Type} </p>
        <p className="badge badge-pill badge-secondary">
          Language: {movie.Language}
        </p>
        <div className="row">
          <div className="col-md-auto d-flex justify-content-center mb-2">
            <img
              src={movie.Poster}
              height="300"
              width="220"
              alt={movie.Title}
              align="center"
            />
          </div>
          <div className="col">
            {this.movieInfo()}
            <div className="d-flex">
              <div className="key-movie">Rating</div>
              <div className="pl-1 pr-0 dot-movie">:</div>
              <div className="val-movie">
                {movie.imdbRating}/10 From {movie.imdbVotes} Votes
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-justify">{movie.Plot}</p>
        <p className="text-left">Awards: {movie.Awards}</p>
      </div>
    );
  };

  isLoading() {
    if (this.state.isLoading) {
      return (
        <div className="mt-5" align="center">
          <ReactLoading type="bars" color="#1AC8DB" height={420} width={300} />
        </div>
      );
    } else {
      return this.displayDetails();
    }
  }

  render() {
    return (
      <div>
        <SearchMovie />
        <hr className="mb-0"></hr>
        {this.isLoading()}
      </div>
    );
  }
}
