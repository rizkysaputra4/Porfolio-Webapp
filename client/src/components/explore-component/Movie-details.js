import React from "react";
import axios from "axios";
import SearchMovie from "./Search-movie";
import "./movie-details.css";
import ReactLoading from "react-loading";

const server = "https://rizkyport.herokuapp.com/api";

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
        console.log(res.data);
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
        <div className="row" key={index}>
          <div className="col-2 key-movie">{keys[index]}</div>
          <div className="col-md-auto pl-1 pr-0">:</div>
          <div className="col">{info}</div>
        </div>
      );
    });
  };

  displayDetails = () => {
    const movie = this.state.movie;
    return (
      <div className="container w-75 movie-container mt-0 p-4">
        <h3>
          {movie.Title} ({movie.Year})
        </h3>
        <p className="badge badge-pill badge-secondary">{movie.Rated} </p>
        <p className="badge badge-pill badge-secondary">{movie.Type} </p>
        <p className="badge badge-pill badge-secondary">
          Language: {movie.Language}
        </p>
        <div className="row">
          <div className="col-md-auto">
            <img
              src={movie.Poster}
              height="300"
              width="220"
              alt={movie.Title}
            />
          </div>
          <div className="col pl-0">
            <div className="container-fluid pl-0">
              {this.movieInfo()}
              <div className="row">
                <div className="col-2 key-movie">Rating</div>
                <div className="col-md-auto pl-1 pr-0">:</div>
                <div className="col">
                  {movie.imdbRating}/10 From {movie.imdbVotes} Votes
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-justify">{movie.Plot}</p>

        {/* <div className="">
          <h6>Rating: </h6>
          <div>{this.ratings()}</div>
        </div> */}
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
