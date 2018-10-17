const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geoLib = require("geolib");

const PostSchema = new Schema(
  {
    title: { type: String, require: true, trim: true },
    description: { type: String, trim: true },
    image_url: { type: String, unique: true, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
    category: { type: String, required: true, trim: true },
    user_id: { type: String, required: true },
    createdAt: {
      type: Date,
      required: false
    },
    updatedAt: {
      type: Number,
      required: false
    }
  },
  { runSettersOnQuery: true }
);

PostSchema.methods = {
  checkInRadius: function(inputLatitude, inputLongitude) {
    return geoLib.isPointInCircle(
      { latitude: inputLatitude, longitude: inputLongitude },
      { latitude: this.latitude, longitude: this.longitude },
      50000
    );
  }
};

PostSchema.pre("save", function(next) {
  const currentDate = new Date().getTime();

  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
