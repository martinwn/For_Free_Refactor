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
    uploadedImage: null,
    category: ""
  };

  handleDrop = files => {
    this.setState({
      uploadedImage: files[0]
    });
  };

  handleImageUpload = (imageFile, cb) => {
    API.uploadImage(imageFile)
      .then(response => {
        cb(response.data);
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    if (e.label) {
      return this.setState({ category: e });
    }
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handlePostReset = () => {
    this.setState({
      uploadedImage: null,
      title: "",
      description: "",
      category: null
    });
  };

  handleRemoveImage = () => {
    this.setState({ uploadedImage: null });
  };

  handlePostSubmit = () => {
    this.handleImageUpload(this.state.uploadedImage, response => {
      const address = `${this.props.user.location.address.city}, ${this.props
        .user.location.address.state ||
        this.props.user.location.address.country}`;

      let query = {
        title: this.state.title,
        description: this.state.description,
        image_url: response,
        latitude: this.props.user.location.coords.latitude,
        longitude: this.props.user.location.coords.longitude,
        address: address,
        user_id: this.props.user.id,
        category: this.state.category.value
      };

      API.createPost(query)
        .then(response => this.props.history.replace("/"))
        .catch(error => console.log(error));
    });
  };

  render() {
    return (
      <PageWrapper>
        <AppBar handleLogout={this.props.handleLogout} currentPage="Post" />
        <ContentWrapper>
          <Grid
            container
            spacing={this.props.spacing}
            style={{ display: "flex", justifyContent: "center" }}
          >
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
                categories={this.props.categories}
                category={this.state.category}
              />
            </Grid>
          </Grid>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default PostPage;
