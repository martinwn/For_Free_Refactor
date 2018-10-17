const express = require("express");
const path = require("path");
const formData = require("express-form-data");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const db = require("./models");
const PORT = process.env.PORT || 3001;

const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formData.parse());
// Env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
// Cross-browser origin access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Origin, Content-type, Authorization, Accept"
  );
  next();
});

const jwtMW = exjwt({
  secret: process.env.SECRET
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// Database
mongoose.set("useCreateIndex", true);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/final_project",
  { useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.log("Failure to connect to database");
    } else {
      console.log("Connection to Database Successful");
    }
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/register", (req, res) => {
  db.User.create(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      if (error.code === 11000) {
        res.status(409).send(error);
      } else {
        res.status(500).send(error);
      }
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ email: email })
    .then(user => {
      if (user.checkPassword(password)) {
        //If all credentials are correct do thiss
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SECRET,
          { expiresIn: 129600 }
        ); // Sigining the token
        res.json({
          success: true,
          err: null,
          token
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          token: null,
          err: "email or password is incorrect"
        });
      }
    })
    .catch(error => {
      res.status(401).send(error);
    });
});

app.post("/upload", (req, res) => {
  cloudinary.v2.uploader
    .upload(req.files.image.path, {
      eager: [{ width: 400, crop: "fit" }]
    })
    .then(response => {
      res.json(response.secure_url);
    })
    .catch(error => {
      res.send(error);
    });
});

app.post("/post", (req, res) => {
  db.Post.create(req.body)
    .then(function(dbPost) {
      db.User.findOneAndUpdate(
        {
          _id: req.body.user_id
        },
        {
          $push: { posts: dbPost._id }
        },
        { upsert: true }
      )
        .then(response => res.status(201).send(response))
        .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
});

app.get("/post", (req, res) => {
  const { latitude, longitude, categories, offset } = req.query;
  let postArray = [];
  if (categories) {
    db.Post.find({ category: { $in: [...categories] } })
      .sort({ createdAt: -1 })
      .skip(Number(offset))
      .limit(5)
      .then(post => {
        post.forEach(function(element) {
          if (element.checkInRadius(latitude, longitude)) {
            postArray.push(element);
          }
        });
      })
      .then(function() {
        res.json(postArray);
      })
      .catch(error => res.status(500).send(error));
  } else {
    console.log(offset);

    db.Post.find()
      .sort({ createdAt: -1 })
      .skip(Number(offset))
      .limit(5)
      .then(post => {
        post.forEach(function(element) {
          if (element.checkInRadius(latitude, longitude)) {
            postArray.push(element);
          }
        });
      })
      .then(function() {
        res.json(postArray);
      })
      .catch(error => res.send(error));
  }
});

app.delete("/post", (req, res) => {
  console.log(req.query.id);
  db.Post.deleteOne({ _id: req.query.id })
    .then(post => res.status(202).send(response))
    .catch(error => res.status(500).send(error));
});

app.delete("/notification", (req, res) => {
  console.log(req.query.id);
  db.Notification.deleteOne({ _id: req.query.id })
    .then(response => res.status(202).send(response))
    .catch(error => console.log(error));
});

app.post("/notification", (req, res) => {
  db.Notification.create(req.body)
    .then(function(dbNotification) {
      db.User.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: { notifications: dbNotification._id }
        },
        { upsert: true }
      )
        .then(response => res.status(201).send(response))
        .catch(error => res.status(500).send(error));
    })
    .catch(error => res.status(500).send(error));
});

app.get("/profile", (req, res) => {
  db.User.findOne({ _id: req.query.id })
    .populate({ path: "posts", options: { sort: { createdAt: "descending" } } })
    .populate({
      path: "notifications",
      options: { sort: { createdAt: "descending" } }
    })
    .then(profile => {
      const profileInfo = {
        posts: profile.posts,
        notifications: profile.notifications
      };
      res.json(profileInfo);
    })
    .catch(error => res.status(500).send(error));
});

app.get("*", jwtMW, (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Error handling
app.use(function(error, req, res, next) {
  if (error.name === "UnauthorizedError") {
    res.status(401).send(error);
  } else {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
