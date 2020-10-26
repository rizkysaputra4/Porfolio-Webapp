import React, { Component } from "react";
import axios from "axios";
import AuthHandler from "./auth/Auth-Handler";
//import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { UserProvider, UserConsumer } from "./context";

const server = "http://localhost:5000/api";

export default class Wall extends Component {
  constructor(props) {
    super(props);

    this.onChangePost = this.onChangePost.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);

    this.onChangeReplyText = this.onChangeReplyText.bind(this);
    this.onSubmitReply = this.onSubmitReply.bind(this);

    this.onChangeUpdatePost = this.onChangeUpdatePost.bind(this);
    this.onSubmitUpdatePost = this.onSubmitUpdatePost.bind(this);

    this.state = {
      postList: [],
      name: "",
      post: "",
      replyList: [],

      updateTextPost: "",

      myPostList: [],
      userID: "",

      //login/register prop

      isLoggedIn: false,
      myUserName: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${server}/checkLogin`)
      .then((res) => {
        const myUserName = res.data.userName;
        this.setState({ myUserName });
        console.log(this.state.myUserName);

        if (!res.data.login) {
          console.log("generate token");
          axios.get(`${server}/generateGuestToken`).then((res) => {
            console.log(res.data);
          });
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${server}/get`, { withCredentials: true })
      .then((res) => {
        const postList = res.data;
        this.setState({ postList });
        console.log(this.state.postList);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${server}/getting/mypost`, { withCredentials: true })
      .then((res) => {
        const myPostList = res.data;
        this.setState({ myPostList });
      })
      .catch((err) => console.log(err));

    axios.get(`${server}/checkLogin`).then((res) => {
      if (res.data.userID === "Guest" || res.data.login === false) {
        this.setState({ isLoggedIn: false });
      } else {
        this.setState({ isLoggedIn: true });
      }
    });
  }

  ////////Add Post/////////

  onChangePost(e) {
    this.setState({
      post: e.target.value,
    });
  }

  onSubmitPost(e) {
    e.preventDefault();

    const post = {
      post: this.state.post,
      withCredentials: true,
    };

    axios
      .post(`${server}/addPost`, post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({
      post: "",
    });

    axios
      .get(`${server}/get`)
      .then((res) => {
        const postList = res.data;
        this.setState({ postList });
      })
      .catch((err) => console.log(err));
  }

  ////////Wall Post////////////

  Post(props) {
    const MyVerticallyCenteredModal = (props) => {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <UserConsumer>
              {(value) => {
                let post = value.postsProp.post;
                let post_id = value.postsProp._id;
                console.log(post, post_id);
                return value.updatePostFunc(post_id, post);
              }}
            </UserConsumer>
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    };

    const App = (props) => {
      const [modalShow, setModalShow] = React.useState(false);

      return (
        <>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Edit Post
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      );
    };

    return (
      <div className="post-box">
        <br></br>
        <div className="card w-75 mx-auto">
          <div className="card-body mb-0 pb-0">
            <div className="media" id="post-box">
              <img src="..." className="mr-3" alt="..." />
              <div className="media-body">
                <div className="container h-auto pb-0">
                  <div className="row h-auto">
                    <div className="justify-content-start">
                      <h5 className="card-title h-auto mb-0">
                        {props.posts.userName}
                      </h5>
                    </div>
                    <div className="col-sm align-items-start">
                      <div className="dropdown float-right">
                        <svg
                          className="btn btn-secondary dropdown-toggle float-right"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-three-dots"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                          />
                        </svg>

                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div className="dropdown-item">
                            <App posts={props.posts} />
                          </div>
                          <button
                            className="dropdown-item"
                            onClick={props.deletePostFunc}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm-left mb-1" id="date">
                  posted: {props.posts.dateCreated}
                </p>
                <p className="text-left post-content p-3">{props.posts.post}</p>
                <div className="container mb-3">
                  <div className="row" id="#replyGroup">
                    <div
                      className="col-md-auto p-0"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#id${props.posts._id}`}
                      aria-expanded="false"
                      aria-controls="comment-form"
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 1000 1000"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 150 63C 150 63 150 63 150 63C 150 63 850 63 850 63C 898 63 937 102 937 150C 937 150 937 650 937 650C 937 698 898 738 850 738C 850 738 517 738 517 738C 517 738 353 925 353 925C 343 936 326 941 312 935C 297 930 288 916 287 900C 287 900 287 738 287 738C 287 738 150 738 150 738C 102 738 63 698 63 650C 63 650 63 150 63 150C 63 102 102 63 150 63M 325 350C 325 350 325 350 325 350C 312 350 299 355 290 365C 280 374 275 387 275 400C 275 413 280 426 290 435C 299 445 312 450 325 450C 338 450 351 445 360 435C 370 426 375 413 375 400C 375 387 370 374 360 365C 351 355 338 350 325 350M 500 350C 500 350 500 350 500 350C 487 350 474 355 465 365C 455 374 450 387 450 400C 450 413 455 426 465 435C 474 445 487 450 500 450C 513 450 526 445 535 435C 545 426 550 413 550 400C 550 387 545 374 535 365C 526 355 513 350 500 350M 675 350C 675 350 675 350 675 350C 662 350 649 355 640 365C 630 374 625 387 625 400C 625 413 630 426 640 435C 649 445 662 450 675 450C 688 450 701 445 710 435C 720 426 725 413 725 400C 725 387 720 374 710 365C 701 355 688 350 675 350" />
                      </svg>
                    </div>

                    <div className="col w-auto d-flex justify-content-end">
                      <div className="px-2">
                        <svg
                          type="button"
                          width="24"
                          height="24"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M 100 0C 45 0 0 45 0 100C 0 100 0 900 0 900C 0 955 45 1000 100 1000C 100 1000 900 1000 900 1000C 955 1000 1000 955 1000 900C 1000 900 1000 100 1000 100C 1000 45 955 0 900 0C 900 0 100 0 100 0C 100 0 100 0 100 0M 100 75C 100 75 900 75 900 75C 914 75 925 86 925 100C 925 100 925 900 925 900C 925 914 914 925 900 925C 900 925 100 925 100 925C 86 925 75 914 75 900C 75 900 75 100 75 100C 75 86 86 75 100 75C 100 75 100 75 100 75 M 526 223C 526 223 526 223 526 223C 526 223 526 223 527 223C 527 223 727 423 727 423C 742 438 742 462 727 477C 712 492 688 492 673 477C 673 477 538 341 538 341C 538 341 538 750 538 750C 538 771 522 788 501 788C 480 789 463 771 463 750C 463 750 463 340 463 340C 463 340 327 477 327 477C 312 492 288 492 273 477C 258 462 258 438 273 423C 273 423 469 228 469 228C 476 218 488 212 500 212C 509 212 519 216 526 223C 526 223 526 223 526 223" />
                          {/* <path d="M 100 0C 45 0 0 45 0 100C 0 100 0 900 0 900C 0 955 45 1000 100 1000C 100 1000 900 1000 900 1000C 955 1000 1000 955 1000 900C 1000 900 1000 100 1000 100C 1000 45 955 0 900 0C 900 0 100 0 100 0C 100 0 100 0 100 0M 526 223C 526 223 526 223 526 223C 526 223 526 223 527 223C 527 223 727 423 727 423C 742 438 742 462 727 477C 712 492 688 492 673 477C 673 477 538 341 538 341C 538 341 538 750 538 750C 538 771 522 788 501 788C 480 789 463 771 463 750C 463 750 463 340 463 340C 463 340 327 477 327 477C 312 492 288 492 273 477C 258 462 258 438 273 423C 273 423 469 228 469 228C 476 218 488 212 500 212C 509 212 519 216 526 223C 526 223 526 223 526 223" /> */}
                        </svg>
                      </div>
                      <div className="px-2" id="vote-result">
                        92
                      </div>
                      <div className="px-2">
                        <svg
                          type="button"
                          width="24"
                          height="24"
                          viewBox="0 0 1000 1000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M 100 0C 45 0 0 45 0 100C 0 100 0 900 0 900C 0 955 45 1000 100 1000C 100 1000 900 1000 900 1000C 955 1000 1000 955 1000 900C 1000 900 1000 100 1000 100C 1000 45 955 0 900 0C 900 0 100 0 100 0C 100 0 100 0 100 0M 100 75C 100 75 900 75 900 75C 914 75 925 86 925 100C 925 100 925 900 925 900C 925 914 914 925 900 925C 900 925 100 925 100 925C 86 925 75 914 75 900C 75 900 75 100 75 100C 75 86 86 75 100 75C 100 75 100 75 100 75M 526 223C 526 223 526 223 526 223C 526 223 526 223 527 223C 527 223 727 423 727 423C 742 438 742 462 727 477C 712 492 688 492 673 477C 673 477 538 341 538 341C 538 341 538 750 538 750C 538 771 522 788 501 788C 480 789 463 771 463 750C 463 750 463 340 463 340C 463 340 327 477 327 477C 312 492 288 492 273 477C 258 462 258 438 273 423C 273 423 469 228 469 228C 476 218 488 212 500 212C 509 212 519 216 526 223C 526 223 526 223 526 223"
                            transform="rotate(180,500,500)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="collapse px-5" id={`id${props.posts._id}`}>
            <div className="px-1 mb-3 ml-3">{props.replyTab}</div>
            <div id="divider"></div>
            <div>
              {props.posts.reply.map((replyObj) => {
                return (
                  <div className="comment-box px-3" key={replyObj.postedDate}>
                    <div className="card-body">
                      <div className="media">
                        <img src="..." className="mr-3" alt="..." />
                        <div className="media-body">
                          <h6 className="card-title mb-0 pb-0">
                            {replyObj.userName} replied:
                          </h6>
                          <p className="text-sm-left mb-1" id="date">
                            posted: {replyObj.postedDate}
                          </p>
                          <p className="text-left reply-content p-3 mb-0">
                            {replyObj.replyText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    );
  }

  postListDisp() {
    if (!this.state.postList || this.state.postList.length === 0) {
      return (
        <div className="mt-5">
          <p>This Wall is Empty</p>
          <p>Click 'Send Post' tab to post something</p>
        </div>
      );
    } else {
      return this.state.postList.map((post) => {
        return (
          <UserProvider
            value={{ updatePostFunc: this.formUpdatePost, postsProp: post }}
          >
            <this.Post
              posts={post}
              key={post._id}
              replyTab={this.replyForm(post._id)}
              deletePostFunc={() => this.deletePost(post._id)}
            />
          </UserProvider>
        );
      });
    }
  }

  myPostListDisp() {
    if (this.state.isLoggedIn) {
      if (!this.state.myPostList || this.state.myPostList.length === 0) {
        return (
          <div className="mt-5">
            <p>You haven't post anything</p>
            <p>Visit 'Send Post' tab to post something</p>
          </div>
        );
      } else {
        return this.state.myPostList.map((post) => {
          return (
            <this.Post
              posts={post}
              key={post._id}
              replyTab={this.replyForm(post._id)}
              deletePostFunc={() => this.deletePost(post._id)}
              updatePost={() => this.formUpdatedPost(post._id, post.post)}
            />
          );
        });
      }
    } else {
      return (
        <div>
          <p>Oops you are log in as a guest, nothing to show here</p>
          <p>Log in or Sign Up to show your post here.</p>
        </div>
      );
    }
  }

  onChangeUpdatePost(e) {
    this.setState({
      updateTextPost: e.target.value,
    });
  }

  onSubmitUpdatePost(post_id) {
    const post = {
      post: this.state.updateTextPost,
      withCredentials: true,
    };

    axios
      .post(`${server}/updatepost/${post_id}`, post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({
      updateTextPost: "",
    });
  }

  deletePost(post_id) {
    console.log(post_id);

    axios
      .delete(`${server}/deletepost/${post_id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  formUpdatePost = (post_id, postList) => {
    //this.setState({ updateTextPost: postList });
    console.log(this.state.updateTextPost);
    return (
      <div className="add-post-box">
        <p>fdasfad</p>
        <form onSubmit={() => this.onSubmitUpdatePost(post_id)}>
          <div className="form-group" id="update-post">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              value={this.state.updateTextPost}
              onChange={this.onChangeUpdatePost}
            />
          </div>
          <div>
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  };

  sendPost() {
    return (
      <div className="add-post-box">
        <h3>Post anything :)</h3>
        <form onSubmit={this.onSubmitPost}>
          <div className="form-group" id="comment">
            <textarea
              placeholder="What do you think?"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              value={this.state.post}
              onChange={this.onChangePost}
            />
          </div>
          <div>
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }

  /////////////////REPLY FORM//////////////////
  onChangeReplyText(e) {
    this.setState({
      replyText: e.target.value,
    });
  }

  onSubmitReply(post_id) {
    const reply = {
      userName: this.state.userName,
      replyText: this.state.replyText,
    };

    axios
      .post(`${server}/replyPost/${post_id}`, reply)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({
      replyText: "",
    });
  }

  replyForm(post_id) {
    return (
      <div>
        <form onSubmit={() => this.onSubmitReply(post_id)}>
          <div className="form-group" id="comment">
            <textarea
              placeholder="Write comment...."
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              onChange={this.onChangeReplyText}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Send Reply"
              className="btn btn-primary btn-sm"
            />
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="container-box">
        <div className="left-box">
          <p>ssfdd</p>
        </div>
        <div className="border content-box">
          <div className="empty-box"></div>

          <ul
            className="nav nav-tabs justify-content-center"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#add-post"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Send Post
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#wall"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Wall
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#mypost"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                My Post
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="add-post"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div>{this.sendPost()}</div>
            </div>
            <div
              className="tab-pane fade"
              id="wall"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="wall-post">
                <div>{this.postListDisp()}</div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="mypost"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div>
                <div className="mt-5">
                  <div>{this.myPostListDisp()}</div>
                </div>
                <div className="text-center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-box">
          <AuthHandler isLoggedIn={this.state.isLoggedIn} />
        </div>
      </div>
    );
  }
}
