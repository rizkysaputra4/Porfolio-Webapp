import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Collapse } from "react-bootstrap";

export default class SendPost extends React.Component {
  constructor(props) {
    super(props);
    this.onChangePost = this.onChangePost.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.openForm = this.openForm.bind(this);
    this.state = {
      post: "",
      isOpen: false,
    };
  }

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
      .post(`${this.props.server}/addPost`, post)
      .then((res) => {
        this.notify("Post Uploaded");
        const postList = this.props.postList.reverse();
        const myPostList = this.props.myPostList;
        const updatePostList = this.props.updatePostList;
        postList.push(res.data);

        if (myPostList.length !== 0 && typeof myPostList !== undefined) {
          myPostList.reverse();
          myPostList.push(res.data);
          updatePostList(postList.reverse(), myPostList.reverse());
        } else {
          updatePostList(postList.reverse());
        }
      })
      .catch((err) => console.log(err));

    this.setState({ post: "" });
  }

  notify = (alert) => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    toast.success(`${alert}`, options);
  };

  sendPost = () => {
    return (
      <div className="add-post-box">
        <h3>Post anything :)</h3>
        <form onSubmit={(e) => this.onSubmitPost(e)}>
          <div className="form-group" id="comment">
            <textarea
              placeholder="What do you think?"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="6"
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
  };

  openForm() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  collapseButton = () => {
    return (
      <>
        {/* <Button
          onClick={() => this.openForm()}
          aria-controls="post-form"
          aria-expanded={this.state.isOpen}
        >
          Send Post
        </Button>

        <Collapse in={this.state.isOpen}>
          <div id="post-form">{this.sendPost()}</div>
        </Collapse> */}

        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0 d-flex justify-content-center">
                <button
                  class="btn btn-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Send Post
                </button>
              </h5>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div class="card-body">{this.sendPost()}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div>
        <this.collapseButton />
      </div>
    );
  }
}
