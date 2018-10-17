import FormData from "form-data";
const axios = require("axios");

export default {
  registerUser: function(query) {
    return axios.post("/register", query);
  },

  uploadImage: function(imageFile) {
    let form = new FormData();
    form.append("image", imageFile);
    return axios.post("/upload", form);
  },

  createPost: function(query) {
    return axios.post("/post", query);
  },

  grabPosts: function(query) {
    return axios.get("/post", {
      params: { latitude: query.latitude, longitude: query.longitude }
    });
  },

  connectUserPost: function(query) {
    console.log(query);
    return axios.post("/notification", query);
  },

  getUserProfile: function(query) {
    console.log(query);
    return axios.get("/profile", { params: { id: query } });
  },

  deletePost: function(query) {
    return axios.delete("/post", { params: { id: query } });
  },

  deleteNotification: function(query) {
    return axios.delete("/notification", { params: { id: query } });
  },

  getPostsByCategory: function(query) {
    return axios.get("/post", {
      params: {
        latitude: query.latitude,
        longitude: query.longitude,
        categories: query.categories,
        offset: query.offset
      }
    });
  }
};
