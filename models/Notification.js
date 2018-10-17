const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
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

NotificationSchema.pre("save", function(next) {
  const currentDate = new Date().getTime();

  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
