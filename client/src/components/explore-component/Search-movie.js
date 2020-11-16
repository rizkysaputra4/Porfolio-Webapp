import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class SearchMovie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      movie: "",
    };
  }

  onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onClickSearch = (e) => {
    e.preventDefault();
    console.log("onclicked");

    axios
      .get(`${this.props.server}/searchmovie/${this.state.searchText}`)
      .then((res) => {
        this.setState({ movie: res.data });
        this.props.updateResult(res.data.Search);
        console.log(this.state.movie);
        console.log(this.props.updateResult);
      })
      .catch((err) => console.log(err));
  };

  searchForm = () => {
    return (
      <div className="d-flex justify-content-center mt-2 mb-2">
        <Form onSubmit={(e) => this.onClickSearch(e)}>
          <Form.Row className="align-items-center mt-2" xs="auto">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Title"
                value={this.state.searchText}
                onChange={this.onChangeSearchText}
                required
              />
            </Col>
            <Col xs="auto">
              <Link
                to={{
                  pathname: `/search-movie/${this.state.searchText.trim()}/1`,
                  movie: this.state.movie,
                  server: this.props.server,
                }}
              >
                <Button type="submit" className="mb-2">
                  Search
                </Button>
              </Link>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  };

  render() {
    return <this.searchForm />;
  }
}
