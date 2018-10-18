import React, { Component } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import CategoryList from "./CategoryList/CategoryList";
import UserCard from "../../UserCard/UserCard";
import AppBar from "../../AppBar/AppBar";
import Post from "./Post/Post";
import API from "../../../utils/API";

const PageWrapper = styled.div`
  background: rgba(230, 230, 230, 1);
  max-width: 100%;
  min-height: 100%;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

class HomePage extends Component {
  state = {
    posts: null,
    checked: [],
    offset: 0
  };

  componentDidMount() {
    window.onscroll = () => {
      if (document.getElementById("homepage")) {
        if (
          Math.round(window.innerHeight) + Math.round(window.scrollY) ===
          Math.round(document.getElementById("homepage").offsetHeight - 1)
        ) {
          return this.loadMore();
        }
      }
    };
  }

  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.handleCategorySearch();
      }
    );
  };

  handleCategorySearch() {
    const query = {
      latitude: this.props.user.location.coords.latitude,
      longitude: this.props.user.location.coords.longitude,
      categories: this.state.checked
    };
    API.getPostsByCategory(query).then(response => {
      this.setState({ posts: response.data, offset: response.data.length });
    });
  }

  loadMore() {
    const query = {
      latitude: this.props.user.location.coords.latitude,
      longitude: this.props.user.location.coords.longitude,
      categories: this.state.checked,
      offset: this.state.offset
    };

    API.getPostsByCategory(query).then(response => {
      const posts = [...this.state.posts];
      for (let i = 0; i < response.data.length; i++) {
        posts.push(response.data[i]);
      }
      this.setState({ posts: posts }, () => {
        this.setState({ offset: this.state.posts.length });
      });
    });
  }

  componentWillMount() {
    this.setState({ offset: 0 });
    this.handleCategorySearch();
  }

  render() {
    const {
      user,
      categories,
      spacing,
      handleLogout,
      handleUserPostConnect
    } = this.props;

    return (
      <PageWrapper id="homepage">
        <AppBar handleLogout={handleLogout} currentPage="Home" />
        <ContentWrapper>
          <Grid
            container
            alignItems="flex-start"
            spacing={spacing}
            style={{ position: "sticky", top: 55 }}
          >
            <Grid item xs={12} md={3} style={{ position: "sticky", top: 55 }}>
              <CategoryList
                checked={this.state.checked}
                handleToggle={this.handleToggle}
                categories={categories}
              />
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
              item
              md={6}
            >
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
                      targetUser={post.user_id}
                      image={post.image_url}
                      address={post.address}
                      date={post.createdAt}
                      category={post.category}
                      handleUserPostConnect={handleUserPostConnect}
                    />
                  );
                })
              )}
            </Grid>
            <Grid style={{ position: "sticky", top: 55 }} item md={3}>
              <UserCard user={user} />
            </Grid>
          </Grid>
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

export default HomePage;
