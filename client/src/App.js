import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostPage from "./components/Pages/PostPage/PostPage";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import HomePage from "./components/Pages/HomePage/HomePage";
import AuthService from "./components/AuthService/AuthService";
import WithAuth from "./components/WithAuth/WithAuth";
import Theme from "./components/Theme/Theme";
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
    checked: [0],
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

    this.setState({
      checked: newChecked
    });
  };

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
    window.location.reload();
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
                handleLogout={this.handleLogout}
                spacing={this.state.spacing}
                categories={this.state.categories}
                checked={this.state.checked}
                handleToggle={this.handleToggle}
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
                handleLogout={this.handleLogout}
                spacing={this.state.spacing}
              />
            )}
          />
        </Theme>
      </Router>
    );
  }
}

export default WithAuth(App);
