import React from "react";
import { Link } from "react-router-dom";

export default class SearchResults extends React.Component {
  displayResult = () => {
    const movie = this.props.movie;
    return (
      <Link
        id="movie-link"
        to={{
          pathname: `/movie/${movie.imdbID}`,
          movieID: movie.imdbID,
          server: this.props.server,
        }}
      >
        <div className="col-10">
          <div className="card h-auto  " style={{ width: "20rem" }}>
            <div className="card-body mb-0 pb-0" id="search-card">
              <div className="d-flex justify-content-center ">
                <h5 className="card-title h-auto">
                  {movie.Title} ({movie.Year})
                </h5>
              </div>

              <div className="d-flex justify-content-center ">
                <p id="date" className="text-sm-left mb-1">
                  Type: {movie.Type}
                </p>
              </div>
              <div
                className="media d-flex justify-content-center"
                id="post-box"
              >
                <img
                  src={movie.Poster}
                  height="180"
                  width="140"
                  className="mr-3 mb-4"
                  alt={movie.Title}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  render() {
    return <this.displayResult />;
  }
}
