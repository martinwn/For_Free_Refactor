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
  }
};
