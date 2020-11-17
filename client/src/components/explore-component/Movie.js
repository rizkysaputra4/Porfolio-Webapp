import React from "react";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  movieCards = () => {
    const movie = this.props.movie;
    return (
      <div className="card h-auto w-75 mx-auto " id="post-box">
        <div className="card-body mb-1 pb-0 border-bottom" id="post-cont">
          <Link
            to={{
              pathname: `/movie/${movie.imdbID}`,
              movieID: movie.imdbID,
              server: this.props.server,
            }}
          >
            <div className="container h-auto pb-0 mx-0 px-0">
              <div className="d-flex flex-row">
                <h3 className="card-title h-auto">
                  {movie.Title} ({movie.Year})
                </h3>
              </div>
            </div>
          </Link>

          <div>
            <p id="date" className="text-sm-left mb-1">
              Genre: {movie.Genre}, Rated: {movie.Rated}, Runtime:{" "}
              {movie.Runtime}
            </p>
          </div>
          <div className="media" id="post-box">
            <img
              src={movie.Poster}
              height="180"
              width="140"
              className="mr-3 mb-2"
              alt="..."
            />
            <div className="media-body">
              <p className="text-sm-left mb-1">
                IMDB: {movie.imdbRating}/10 From {movie.imdbVotes} votes
              </p>
              <p className="text-left post-content p-3">{movie.Plot}</p>
              <div className="container mb-3">
                <div className="row" id="replyGroup"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="collapse px-5  mt-2" /* id={`id${this.props.posts._id}`} */
        ></div>
        <div className=""></div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div>{this.movieCards()}</div>
      </div>
    );
  }
}
