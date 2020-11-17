import React from "react";
import SearchResults from "./Search-result";
import axios from "axios";
import SearchMovie from "./Search-movie";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { server } from "../Wall";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: [],
      totalPage: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(
        `${server}/searchmovie/${this.props.match.params.keyword}/${this.props.match.params.page}`
      )
      .then((res) => {
        this.setState({ searchResult: res.data, isLoading: false });
      });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.keyword !== this.props.match.params.keyword ||
      prevProps.match.params.page !== this.props.match.params.page
    ) {
      this.setState({ isLoading: true });
      axios
        .get(
          `${server}/searchmovie/${this.props.match.params.keyword}/${this.props.match.params.page}`
        )
        .then((res) => {
          this.setState({ searchResult: res.data, isLoading: false });
        });

      window.scrollTo(0, 0);
    }
  }

  isLoading() {
    if (this.state.isLoading) {
      return (
        <div className="mt-5" align="center">
          <ReactLoading type="bars" color="#1AC8DB" height={420} width={300} />
        </div>
      );
    } else {
      return (
        <div className="row flex-md-wrap mx-auto justify-content-center">
          <this.displaySearchResult />
        </div>
      );
    }
  }

  displaySearchResult = () => {
    if (!this.state.searchResult.Search) {
      return (
        <div className="mt-5">
          <h5>{this.state.searchResult.Error}</h5>
        </div>
      );
    } else {
      return this.state.searchResult.Search.map((movie, index) => {
        return (
          <div className="mt-3" key={index}>
            <SearchResults movie={movie} server={this.props.location.server} />
          </div>
        );
      });
    }
  };

  updateSearchResult = (result) => {
    this.setState({ searchResult: result });
  };

  pageButton = () => {
    let pageMax;
    let pageNow = parseInt(this.props.match.params.page);
    let i = pageNow;
    let arr = [];
    const totalResult = this.state.searchResult.totalResults;
    if (totalResult % 10 === 0) {
      pageMax = Math.floor(totalResult / 10);
    } else {
      pageMax = Math.floor(totalResult / 10) + 1;
    }

    for (i = pageNow - 3; i <= pageNow + 3; i++) {
      if (i > 0 && i <= pageMax) {
        arr.push(i);
      }
    }

    return arr.map((page, index) => {
      if (page === parseInt(this.props.match.params.page)) {
        return (
          <div key={index} className="page-item active">
            <div className="page-link">{page}</div>
          </div>
        );
      } else {
        return (
          <Link
            key={index}
            to={`/search-movie/${this.props.match.params.keyword}/${page}`}
          >
            <div className="page-item">
              <div className="page-link">{page}</div>
            </div>
          </Link>
        );
      }
    });
  };

  render() {
    let pageMax;
    const totalResult = this.state.searchResult.totalResults;
    if (totalResult % 10 === 0) {
      pageMax = Math.floor(totalResult / 10);
    } else {
      pageMax = Math.floor(totalResult / 10) + 1;
    }

    return (
      <>
        <SearchMovie updateResult={this.updateSearchResult} server={server} />
        <div className="container-fluid">
          {this.isLoading()}

          <div className="d-flex justify-content-center mt-5">
            <ul className="pagination">
              <Link to={`/search-movie/${this.props.match.params.keyword}/1`}>
                <div className="page-item">
                  <div className="page-link">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </div>
                </div>
              </Link>
              {this.pageButton()}
              <Link
                to={`/search-movie/${this.props.match.params.keyword}/${pageMax}`}
              >
                <div className="page-item">
                  <div className="page-link">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </div>
                </div>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
