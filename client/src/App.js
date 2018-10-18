import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostPage from "./components/Pages/PostPage/PostPage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import HomePage from "./components/Pages/HomePage/HomePage";
import AuthService from "./components/AuthService/AuthService";
import WithAuth from "./components/WithAuth/WithAuth";
import Theme from "./components/Theme/Theme";
import API from "./utils/API";
const Auth = new AuthService();

class App extends Component {
  state = {
    categories: [
      "antiques",
      "appliances",
      "arts/crafts",
      "atv",
      "auto parts",
      "aviation",
      "baby",
      "beauty",
      "bike parts",
      "bikes",
      "boat parts",
      "boats",
      "books",
      "business",
      "cars/trucks",
      "cd/dvd/vhs",
      "cell phones",
      "clothes",
      "collectibles",
      "computer parts",
      "computers",
      "electronics",
      "farm/garden",
      "furniture",
      "general",
      "heavy equipment",
      "household",
      "jewelry",
      "materials",
      "motorcycle parts",
      "motorcycles",
      "music instruments",
      "photo/video",
      "rvs/camping",
      "sporting",
      "tickets",
      "tools",
      "toys/games",
      "trailers",
      "video gaming",
      "wheels/tires"
    ],
    checked: [],
    spacing: 32
  };

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
        const query = {
          latitude: this.props.user.location.coords.latitude,
          longitude: this.props.user.location.coords.longitude,
          categories: this.state.checked
        };
        this.handleCategorySearch(query);
      }
    );
  };

  handleCategorySearch(query) {
    API.getPostsByCategory(query).then(response => {});
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
    window.location.reload();
  };

  handleUserPostConnect = (targetUser, title) => {
    const query = {
      user_id: targetUser,
      email: this.props.user.email,
      title: title
    };
    API.connectUserPost(query)
      .then(response => this.setState({ postConnectionSent: true }))
      .catch(error => console.log(error));
  };

  handleDeletePost = id => {
    API.deletePost(id)
      .then(response => window.location.reload())
      .catch(error => window.location.reload());
  };

  handleDeleteNotification = id => {
    API.deleteNotification(id)
      .then(response => window.location.reload())
      .catch(error => console.log(error));
  };

  render() {
    const { user } = this.props;
    return (
      <Router>
        <Theme>
          <Route
            exact
            path="/"
            render={props => (
              <HomePage
                {...props}
                user={user}
                posts={this.state.posts}
                handleLogout={this.handleLogout}
                spacing={this.state.spacing}
                categories={this.state.categories}
                handleUserPostConnect={this.handleUserPostConnect}
              />
            )}
          />
          <Route
            exact
            path="/post"
            render={props => (
              <PostPage
                {...props}
                user={user}
                handleLogout={this.handleLogout}
                spacing={this.state.spacing}
                categories={this.state.categories}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <ProfilePage
                {...props}
                user={user}
                handleDeletePost={this.handleDeletePost}
                handleLogout={this.handleLogout}
                spacing={this.state.spacing}
                handleDeleteNotification={this.handleDeleteNotification}
              />
            )}
          />
        </Theme>
      </Router>
    );
  }
}

export default WithAuth(App);
