import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUpdatePost = this.onChangeUpdatePost.bind(this);
    this.onSubmitUpdatePost = this.onSubmitUpdatePost.bind(this);
    this.editPostForm = this.editPostForm.bind(this);

    this.state = {
      textPost: "",
      updateTextPost: "",
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ textPost: nextProps.post, updateTextPost: nextProps.post });
  }

  onChangeUpdatePost(e) {
    this.setState({
      updateTextPost: e.target.value,
    });
  }

  onSubmitUpdatePost(e) {
    e.preventDefault();
    const post = {
      post: this.state.updateTextPost,
      withCredentials: true,
    };

    axios
      .post(`${this.props.server}/updatePost/${this.props.postID}`, post)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          this.setState({
            updateTextPost: this.state.textPost,
          });
          this.props.notify(res.data.error, res.data.error);
        } else {
          this.props.notify(res.data.error, "Edited");
          this.handleCloseModal();

          const postIndex = this.props.postList.findIndex((el) => {
            return el._id === this.props.postID;
          });

          const postList = this.props.postList;
          const myPostList = this.props.myPostList;
          const updatePostList = this.props.updatePostList;
          postList[postIndex].post = post.post;

          if (myPostList) {
            const myPostIndex = this.props.myPostList.findIndex((el) => {
              return el._id === this.props.postID;
            });
            myPostList[myPostIndex].post = post.post;
            updatePostList(postList, myPostList);
          } else {
            updatePostList(postList);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  editPostForm() {
    return (
      <Form onSubmit={(e) => this.onSubmitUpdatePost(e)}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={5}
            value={this.state.updateTextPost}
            onChange={this.onChangeUpdatePost}
          />
        </Form.Group>

        <div className="w-100 d-flex justify-content-center">
          <Button className="mx-auto" type="submit">
            Edit
          </Button>
        </div>
      </Form>
    );
  }

  handleCloseModal = () => {
    this.setState({ show: false });
  };

  handleShowModal = () => {
    this.setState({ show: true });
  };

  EditPostModal = () => {
    return (
      <>
        <button
          className="dropdown-item"
          onClick={() => this.handleShowModal()}
        >
          Edit
        </button>

        <Modal
          size="lg"
          backdrop="static"
          keyboard={false}
          show={this.state.show}
          onHide={() => this.handleCloseModal()}
          centered
        >
          <Modal.Header closeButton>
            <div className="w-100 d-flex justify-content-center">
              <Modal.Title>Edit Post</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>{this.editPostForm()}</Modal.Body>
        </Modal>
      </>
    );
  };

  render() {
    return (
      <div>
        <this.EditPostModal />
      </div>
    );
  }
}
