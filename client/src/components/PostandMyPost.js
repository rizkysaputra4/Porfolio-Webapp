import React, { Component } from "react";
import axios from "axios";

const server = "http://localhost:5000/api";

export default class WallAndMyPost extends Component {
  constructor(props) {
    super(props);

    this.onChangePost = this.onChangePost.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);

    this.state = {
      postList: [],
      myPostList: [],
      isLoggedIn: false,

      name: "",
      post: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${server}/get`, { withCredentials: true })
      .then((res) => {
        const postList = res.data;
        this.setState({ postList });
      })
      .catch((err) => console.log(err));

    axios.get(`${server}/checkLogin`).then((res) => {
      this.setState.postAndReplyuserName = res.userName;
      if (res.data.userID === "Guest" || res.data.login === false) {
        this.setState({ isLoggedIn: false });
      } else {
        this.setState({ isLoggedIn: true });
      }
    });
  }

  onSubmitPost(e) {
    e.preventDefault();

    const post = {
      name: this.state.name,
      post: this.state.post,
      withCredentials: true,
    };

    axios
      .post(`${server}/addPost`, post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    this.setState({
      name: "",
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

  onChangePost(e) {
    this.setState({
      post: e.target.value,
    });
  }

  ////////Wall Post////////////

  Post(props) {
    return (
      <div className="post-box">
        <br></br>
        <div className="card w-75 mx-auto">
          <div className="card-body">
            <div className="media">
              <img src="..." className="mr-3" alt="..." />
              <div className="media-body">
                <h5 className="card-title">{props.posts.userName} said:</h5>
                <p className="text-left">{props.posts.post}</p>
                <p className="card-text">posted: {props.posts.dateCreated}</p>
              </div>
            </div>
          </div>
          <div>{props.posts._id}</div>
        </div>
      </div>
    );
  }

  postListDisp() {
    console.log(this.state.postList);
    //this.state.postList = [];

    if (!this.state.postList || this.state.postList.length === 0) {
      return (
        <div className="mt-5">
          <p>This Wall is Empty</p>
          <p>Click 'Send Post' tab to post something</p>
        </div>
      );
    } else {
      return this.state.postList.map((post) => {
        return <this.Post posts={post} key={post._id} />;
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
          return <this.Post posts={post} key={post._id} />;
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
}
