import React, { Component } from "react";
import "./style/Explore.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default class Explore extends Component {
  Hobbies = () => {
    return (
      <>
        <div className="mx-5 mt-5">
          <h3>Hobbies</h3>
          <hr></hr>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Link to={"/movies"}>
                  <div className="icon">
                    <img
                      src={require("../pic/movie.png")}
                      className="img-thumbnail"
                      alt="movie"
                    />
                    <h5 className="bottom-left mb-0 ml-2">Movies</h5>
                  </div>
                </Link>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/book.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Books (soon)</h5>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/cook.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Cook Recipe (soon)</h5>
              </Col>
            </Row>
          </Container>
        </div>

        <div></div>
      </>
    );
  };

  Tools = () => {
    return (
      <>
        <div className="mx-5 mt-5">
          <h3>Tools</h3>
          <hr></hr>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/movie.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Movies</h5>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/book.png")}
                  className="img-thumbnail"
                  alt="books"
                />
                <h5 className="bottom-left mb-0 ml-2">Books</h5>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/movie.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Cook</h5>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };

  Games = () => {
    return (
      <>
        <div className="mx-5 mt-5">
          <h3>Games</h3>
          <hr></hr>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/movie.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Movies</h5>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/movie.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Books</h5>
              </Col>
              <Col xs={6} md={4}>
                <img
                  src={require("../pic/movie.png")}
                  className="img-thumbnail"
                  alt="movie"
                />
                <h5 className="bottom-left mb-0 ml-2">Cook</h5>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="full-screen">
        <this.Hobbies />

        <div></div>
      </div>
    );
  }
}
