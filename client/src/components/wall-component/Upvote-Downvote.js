import React from "react";
import Axios from "axios";

export default class UpvoteDownvote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: this.props.post.vote,
    };
  }

  upvote = (post_id) => {
    Axios.post(`${this.props.server}/upvotepost/${post_id}`)
      .then((res) => {
        this.setState({ vote: this.state.vote + 1 });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  downvote = (post_id) => {
    Axios.post(`${this.props.server}/downvotepost/${post_id}`)
      .then((res) => {
        this.setState({ vote: this.state.vote - 1 });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  UpvoteDownvoteSection = () => {
    return (
      <>
        <div
          className="col w-auto d-flex justify-content-end"
          id="upvote-downvote"
        >
          <div className="px-2">
            <svg
              type="button"
              onClick={() => this.upvote(this.props.post._id)}
              width="24"
              height="24"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 100 0C 45 0 0 45 0 100C 0 100 0 900 0 900C 0 955 45 1000 100 1000C 100 1000 900 1000 900 1000C 955 1000 1000 955 1000 900C 1000 900 1000 100 1000 100C 1000 45 955 0 900 0C 900 0 100 0 100 0C 100 0 100 0 100 0M 100 75C 100 75 900 75 900 75C 914 75 925 86 925 100C 925 100 925 900 925 900C 925 914 914 925 900 925C 900 925 100 925 100 925C 86 925 75 914 75 900C 75 900 75 100 75 100C 75 86 86 75 100 75C 100 75 100 75 100 75 M 526 223C 526 223 526 223 526 223C 526 223 526 223 527 223C 527 223 727 423 727 423C 742 438 742 462 727 477C 712 492 688 492 673 477C 673 477 538 341 538 341C 538 341 538 750 538 750C 538 771 522 788 501 788C 480 789 463 771 463 750C 463 750 463 340 463 340C 463 340 327 477 327 477C 312 492 288 492 273 477C 258 462 258 438 273 423C 273 423 469 228 469 228C 476 218 488 212 500 212C 509 212 519 216 526 223C 526 223 526 223 526 223" />
            </svg>
          </div>
          <div className="px-2" id="vote-result">
            {this.state.vote}
          </div>
          <div className="px-2">
            <svg
              type="button"
              onClick={() => this.downvote(this.props.post._id)}
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
      </>
    );
  };

  render() {
    return (
      <>
        <this.UpvoteDownvoteSection />
      </>
    );
  }
}
