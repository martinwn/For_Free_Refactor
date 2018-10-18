import React, { Component } from "react";
import AuthService from "../AuthService/AuthService";
const geolocator = require("geolocator");

geolocator.config({
  language: "en",
  google: {
    version: "3",
    key: "AIzaSyCZMt2Xb6B8BVcvBw1kAKbM2b5w_M4rH6M"
  }
});

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumWait: 10000, // max wait time for desired accuracy
  maximumAge: 0, // disable cache
  desiredAccuracy: 30, // meters
  fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
  addressLookup: true,
  timezone: false, // requires Google API key if true
  map: false, // interactive map element id (or options object)
  staticMap: false // requires Google API key if true
};

export default function WithAuth(AuthComponent) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const profile = Auth.getProfile();
          geolocator.locate(options, (error, location) => {
            if (error) return console.log(error);
            profile.location = location;
            this.setState({
              user: profile
            });
          });
        } catch (error) {
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
