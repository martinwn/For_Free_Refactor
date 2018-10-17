const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: { type: String, required: true },
    createdAt: {
      type: Date,
      required: false
    },
    updatedAt: {
      type: Number,
      required: false
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification"
      }
    ]
  },
  { runSettersOnQuery: true }
);

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10));
  }
};

UserSchema.pre("save", function(next) {
  this.email = this.email.toLowerCase();

  const currentDate = new Date().getTime();

  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  if (!this.password) {
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
