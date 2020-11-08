import React from "react";
import axios from "axios";

export default class ReplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeReplyText = this.onChangeReplyText.bind(this);
    this.onSubmitReply = this.onSubmitReply.bind(this);

    this.state = {
      replyText: "",
    };
  }

  onChangeReplyText(e) {
    this.setState({
      replyText: e.target.value,
    });
  }

  onSubmitReply(e, post_id) {
    e.preventDefault();

    const reply = {
      userName: this.state.userName,
      replyText: this.state.replyText,
    };

    axios
      .post(`${this.props.server}/replyPost/${post_id}`, reply)
      .then((res) => {
        const postIndex = this.props.postList.findIndex((el) => {
          return el._id === post_id;
        });
        const postList = this.props.postList;
        const myPostList = this.props.myPostList;
        const updatePostList = this.props.updatePostList;
        postList[postIndex].reply = res.data;

        if (myPostList) {
          const myPostIndex = this.props.myPostList.findIndex((el) => {
            return el._id === post_id;
          });
          if (myPostList[myPostIndex]) {
            myPostList[myPostIndex].reply = res.data;
            updatePostList(postList, myPostList);
          } else {
            updatePostList(postList);
          }
        } else {
          updatePostList(postList);
        }
      })
      .catch((err) => console.log(err));

    this.setState({
      replyText: "",
    });
  }

  replyForm(post_id) {
    return (
      <div>
        <form onSubmit={(e) => this.onSubmitReply(e, post_id)}>
          <div className="form-group" id="comment">
            <textarea
              placeholder="Write comment...."
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              required
              value={this.state.replyText}
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
    return <div>{this.replyForm(this.props.post._id)}</div>;
  }
}
