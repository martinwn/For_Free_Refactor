import React, { Component } from "react";
import styled from "styled-components";
import AppBar from "../../AppBar/AppBar";
import Grid from "@material-ui/core/Grid";
import Post from "./Post/Post";
import UserCard from "../../UserCard/UserCard";
import Notification from "./Notification/Notification";
import API from "../../../utils/API";

const PageWrapper = styled.div`
  background: rgba(230, 230, 230, 1);
  max-width: 100%;
  min-height: 100%;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

class ProfilePage extends Component {
  state = {
    posts: null,
    notifications: null
  };

  componentWillMount() {
    API.getUserProfile(this.props.user.id)
      .then(response => {
        this.setState({
          posts: response.data.posts,
          notifications: response.data.notifications
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      handleLogout,
      user,
      handleDeletePost,
      handleDeleteNotification
    } = this.props;
    return (
      <PageWrapper>
        <AppBar handleLogout={handleLogout} currentPage="Profile" />
        <ContentWrapper>
          <Grid container>
            <Grid
              item
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <h1>My Posts</h1>

              {!this.state.posts ? (
                <h3>Loading</h3>
              ) : (
                this.state.posts.map(post => {
                  return (
                    <Post
                      key={post._id}
                      title={post.title}
                      description={post.description}
                      id={post._id}
                      image={post.image_url}
                      address={post.address}
                      date={post.createdAt}
                      handleDeletePost={handleDeletePost}
                    />
                  );
                })
              )}
            </Grid>
            <Grid
              item
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h1>Notifications</h1>
              {!this.state.notifications ? (
                <h3>Loading</h3>
              ) : (
                this.state.notifications.map(notification => {
                  return (
                    <Notification
                      key={notification._id}
                      id={notification._id}
                      email={notification.email}
                      date={notification.createdAt}
                      title={notification.title}
                      handleDeleteNotification={handleDeleteNotification}
                    />
                  );
                })
              )}
              <Grid item style={{ width: "50%", height: 100 }}>
                <UserCard user={user} />
              </Grid>
            </Grid>
          </Grid>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default ProfilePage;
