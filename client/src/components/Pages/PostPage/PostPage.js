import React, { Component } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import AppBar from "../../AppBar/AppBar";
import PostForm from "./PostForm/PostForm";
import API from "../../../utils/API";

const PageWrapper = styled.div`
  background: rgba(230, 230, 230, 1);
  max-width: 100%;
  min-height: 100%;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const PostTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin-top: 0;
`;

class PostPage extends Component {
  state = {
    title: "",
    description: "",
    uploadedImage: null
  };

  handleDrop = files => {
    this.setState({
      uploadedImage: files[0]
    });
  };

  handleImageUpload = (imageFile, cb) => {
    API.uploadImage(imageFile)
      .then(response => {
        cb(response);
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handlePostReset = () => {
    this.setState({
      uploadedImage: null,
      title: "",
      description: ""
    });
  };

  handleRemoveImage = () => {
    this.setState({ uploadedImage: null });
  };

  handlePostSubmit = () => {
    this.handleImageUpload(this.state.uploadedImage);
  };

  render() {
    return (
      <PageWrapper>
        <AppBar handleLogout={this.props.handleLogout} currentPage="Post" />
        <ContentWrapper>
          <Grid container spacing={this.props.spacing}>
            <Grid item xs={8}>
              <PostTitle>Create Post</PostTitle>
              <PostForm
                handleChange={this.handleChange}
                uploadedImage={this.state.uploadedImage}
                handleDrop={this.handleDrop}
                handlePostReset={this.handlePostReset}
                handleRemoveImage={this.handleRemoveImage}
                handlePostSubmit={this.handlePostSubmit}
                description={this.state.description}
                title={this.state.title}
              />
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default PostPage;
