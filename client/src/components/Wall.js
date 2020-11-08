import React from "react";
import axios from "axios";
import AuthHandler from "./wall-component/Auth-Handler";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./wall-component/Wall-Post.js";
import SendPost from "./wall-component/Send-post";
import { Pagination } from "react-bootstrap";
import ReactLoading from "react-loading";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ToastContainer } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const server = "https://rizkyport.herokuapp.com/api";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);

    this.getPostByPage = this.getPostByPage.bind(this);
    this.updatePostList = this.updatePostList.bind(this);

    this.revealRefs = [];

    this.state = {
      page: "",
      postPageData: "",
      postList: [],
      myPostList: [],

      myUserName: "",
      isLoggedIn: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`${server}/checkLogin`)
      .then((res) => {
        this.setState({ myUserName: res.data.userName });

        if (!res.data.login) {
          axios.post(`${server}/generateGuestToken`).then((res) => {});
        }

        if (res.data.userID.includes("Guest") || res.data.login === false) {
          this.setState({ isLoggedIn: false });
        } else {
          this.setState({ isLoggedIn: true });
        }
      })
      .catch((err) => console.log(err));

    this.getPostByPage(1);

    axios
      .get(`${server}/getting/mypost`, { withCredentials: true })
      .then((res) => {
        this.setState({ myPostList: res.data });
      })
      .catch((err) => console.log(err));
  }

  /*  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.postList === nextState.postList) {
      return false;
    } else {
      return true;
    }
  } */

  componentDidUpdate() {
    this.revealRefs.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 0.5,
          y: -40,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=200",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  PostAnimate = (el) => {
    if (el && !this.revealRefs.includes(el)) {
      this.revealRefs.push(el);
    }
  };

  ////////Wall Post////////////

  updatePostList(postListUpdated, myPostListUpdated) {
    this.setState({ postList: postListUpdated, myPostList: myPostListUpdated });
  }

  postListDisp() {
    if (!this.state.postList || this.state.postList.length === 0) {
      return <div className="mt-5"></div>;
    } else {
      return this.state.postList.map((post, index) => {
        return (
          <div style={{ opacity: 0 }} key={index} ref={this.PostAnimate}>
            <Post
              posts={post}
              deletePostFunc={() => this.deletePost(post._id)}
              server={server}
              picture={this.generateProfilPicture}
              postList={this.state.postList}
              myPostList={this.state.myPostList}
              updatePostList={this.updatePostList}
            />
          </div>
        );
      });
    }
  }

  myPostListDisp() {
    if (this.state.isLoggedIn) {
      if (!this.state.myPostList) {
        return (
          <div className="mt-5 mb-5">
            <p>You haven't post anything</p>
            <p>Visit 'Send Post' tab to post something</p>
          </div>
        );
      } else {
        return this.state.myPostList.map((post, index) => {
          return (
            <div key={index}>
              <Post
                posts={post}
                key={index}
                server={server}
                picture={this.generateProfilPicture}
                postList={this.state.postList}
                myPostList={this.state.myPostList}
                updatePostList={this.updatePostList}
              />
            </div>
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

  /////////////////COMMENT FORM//////////////////

  generateProfilPicture() {
    const sprites = ["male", "female", "human", "bottts", "avataaars", "gridy"];

    let sprite = sprites[Math.floor(Math.random() * sprites.length)];
    let seed = Math.floor(Math.random() * 10000);

    let picture = `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`;
    return picture;
  }

  getPostByPage(getPage) {
    const page = {
      page: getPage,
    };

    axios
      .post(`${server}/get`, page)
      .then((result) => {
        this.setState({
          postPageData: result.data,
          postList: result.data.docs,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  postPageButton() {
    let i;
    let pageMax = this.state.postPageData.totalPages;
    let pageNow = this.state.postPageData.page;
    let arr = [];

    for (i = pageNow - 3; i <= pageNow + 3; i++) {
      if (i > 0 && i <= pageMax) {
        arr.push(i);
      }
    }

    return arr.map((page, index) => {
      if (page === this.state.postPageData.page) {
        return (
          <Pagination.Item key={index} active>
            {page}
          </Pagination.Item>
        );
      } else {
        return (
          <Pagination.Item key={index} onClick={() => this.getPostByPage(page)}>
            {page}
          </Pagination.Item>
        );
      }
    });
  }

  isLoading() {
    if (this.state.isLoading) {
      return (
        <div className="mt-5">
          <ReactLoading type="spin" color="#1AC8DB" />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container-box">
        <div className="left-box" id="left-box">
          <p>ssfdd</p>
        </div>
        <div className="border content-box">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="empty-box"></div>

          <ul
            className="nav nav-tabs justify-content-center"
            id="myTab"
            role="tablist"
          >
            {/* <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="home-tab"
                data-toggle="tab"
                href="#add-post"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Send Post
              </a>
            </li> */}
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
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
            {/* <div
              className="tab-pane"
              id="add-post"
              role="tabpanel"
              aria-labelledby="home-tab"
            ></div> */}
            <div
              className="tab-pane fade show active"
              id="wall"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="d-flex justify-content-center ">
                {this.isLoading()}
              </div>
              <div>
                <SendPost
                  server={server}
                  postList={this.state.postList}
                  updatePostList={this.updatePostList}
                  myPostList={this.state.myPostList}
                />
              </div>
              <div className="wall-post mt-5" id="wpost">
                {this.postListDisp()}
              </div>
              <div className="d-flex justify-content-center mt-2">
                <Pagination>
                  <Pagination.First
                    onClick={() => this.getPostByPage(1)}
                  ></Pagination.First>
                  {this.postPageButton()}
                  <Pagination.Last
                    onClick={() =>
                      this.getPostByPage(this.state.postPageData.totalPages)
                    }
                  ></Pagination.Last>
                </Pagination>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="mypost"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div>
                <div className="mt-5">{this.myPostListDisp()}</div>
                <div className="text-center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-box">
          <AuthHandler
            isLoggedIn={this.state.isLoggedIn}
            userName={this.state.myUserName}
            server={server}
          />
        </div>
      </div>
    );
  }
}
