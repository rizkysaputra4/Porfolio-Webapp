import React from "react";
import EditPost from "./Edit-post-page";
import svg from "../svg-sources";
import { TimelineLite } from "gsap/all";
import { toast } from "react-toastify";
import axios from "axios";
import ReplyForm from "./Reply-form";
import UpvoteDownvote from "./Upvote-Downvote";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.cards = [];
    this.tl = new TimelineLite({ paused: true });

    this.state = {
      alert: "",
    };
  }

  componentDidMount() {
    this.tl.staggerTo(this.cards, 1, { autoAlpha: 1, y: 10 }, 1).play();
  }

  CommentTriggerButton = () => {
    return (
      <>
        <div
          className="col-md-auto p-0"
          type="button"
          data-toggle="collapse"
          data-target={`#id${this.props.posts._id}`}
          aria-expanded="false"
          aria-controls="comment-form"
          id="comment-button"
        >
          {svg.comment}
        </div>
      </>
    );
  };

  deletePost(post_id) {
    axios
      .delete(`${this.props.server}/deletepost/${post_id}`)
      .then((res) => {
        let isError = res.data.error;
        if (isError) {
          this.notify(isError, isError);
        } else {
          this.notify(isError, "Post Deleted");
          const postList = this.props.postList;
          const myPostList = this.props.myPostList;
          console.log(this.props.myPostList);
          const postListDeleted = postList.findIndex((el) => {
            return el._id === post_id;
          });
          console.log(this.props.myPostList);
          const myPostListDeleted = myPostList.findIndex((el) => {
            return el._id === post_id;
          });
          postList.splice(postListDeleted, 1);
          console.log(postList);
          myPostList.splice(myPostListDeleted, 1);
          this.props.updatePostList(postList, myPostList);
        }
      })
      .catch((err) => console.log(err));
  }

  notify = (isError, alert) => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    isError
      ? toast.error(`${alert}`, options)
      : toast.success(`${alert}`, options);
  };

  EditDeletePostOption = () => {
    return (
      <div className="dropdown float-right" id="edit-btn">
        {svg.options}

        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <EditPost
            postID={this.props.posts._id}
            post={this.props.posts.post}
            server={this.props.server}
            className="dropdown-item"
            notify={this.notify}
            postList={this.props.postList}
            myPostList={this.props.myPostList}
            updatePostList={this.props.updatePostList}
          />
          <button
            className="dropdown-item"
            onClick={() => {
              this.deletePost(this.props.posts._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  CommentPostSection = () => {
    return (
      <>
        <div className="px-1 mb-3 ml-3">
          <ReplyForm
            server={this.props.server}
            post={this.props.posts}
            postList={this.props.postList}
            myPostList={this.props.myPostList}
            updatePostList={this.props.updatePostList}
          />
        </div>
        <div id="divider"></div>
        <div>
          {this.props.posts.reply.map((replyObj) => {
            return (
              <div className="comment-box px-3 mb-2" key={Math.random()}>
                <div className="card-body">
                  <div className="media">
                    <img
                      src={this.props.picture()}
                      className="mr-3"
                      alt="..."
                      width="80"
                      height="80"
                    />
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
      </>
    );
  };

  MainPost = () => {
    return (
      <div className="post-box">
        <br></br>
        <div className="card w-75 mx-auto" id="post-box">
          <div className="card-body mb-0 pb-1 border-bottom" id="post-cont">
            <div className="media" id="post-box">
              <img
                src={this.props.picture()}
                height="140"
                width="140"
                className="mr-3"
                alt="..."
              />
              <div className="media-body">
                <div className="container h-auto pb-0 mx-0 px-0">
                  <div className="h-auto">
                    <div className="float-right">
                      {this.EditDeletePostOption()}
                    </div>
                    <h5 className="card-title h-auto mb-0">
                      {this.props.posts.userName}
                    </h5>
                  </div>
                </div>
                <p className="text-sm-left mb-1" id="date">
                  posted: {this.props.posts.dateCreated}
                </p>
                <p className="text-left post-content p-3">
                  {this.props.posts.post}
                </p>
                <div className="container mb-3">
                  <div className="row" id="replyGroup">
                    {this.CommentTriggerButton()}
                    <UpvoteDownvote
                      post={this.props.posts}
                      server={this.props.server}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse px-5  mt-2" id={`id${this.props.posts._id}`}>
            {this.CommentPostSection()}
          </div>
          <div className=""></div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <this.MainPost />
      </div>
    );
  }
}
