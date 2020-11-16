import React from "react";
import axios from "axios";
import Movie from "./Movie";
import SearchMovie from "./Search-movie";
import ReactLoading from "react-loading";

const server = "https://rizkyport.herokuapp.com/api";

export default class DisplayMovies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      movieList: [],
      displayRecommendations: true,
      searchKeyword: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    axios.get(`${server}/recommendations`).then((res) => {
      this.setState({ movieList: res.data, isLoading: false });
    });
  }

  getSearchResult = (keyword, result) => {
    this.setState({ searchKeyword: keyword, searchResult: result });
  };

  movieRecommendations = () => {
    return this.state.movieList.map((movie, index) => {
      return <Movie key={index} movie={movie} server={server} />;
    });
  };

  hideRecommendations = () => {
    this.setState({ displayRecommendations: false });
  };

  displayRecommendations = () => {
    if (this.state.displayRecommendations) {
      return (
        <div>
          <h2 align="center">Movie Recommendations</h2>
          <br></br>

          {this.movieRecommendations()}
        </div>
      );
    } else {
      return null;
    }
  };

  isLoading() {
    if (this.state.isLoading) {
      return (
        <div className="mt-5" align="center">
          <ReactLoading type="bars" color="#1AC8DB" height={420} width={300} />
        </div>
      );
    } else {
      return this.displayRecommendations();
    }
  }

  render() {
    return (
      <div className="mb-5">
        <SearchMovie server={server} getSearchResult={this.getSearchResult} />
        <hr></hr>
        <br></br>
        {this.isLoading()}
      </div>
    );
  }
}
