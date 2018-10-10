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
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
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

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
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

  db.User.findOne({ email: email }).then(user => {
    console.log(user);
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
  });
});

app.post("/upload", (req, res) => {
  console.log(req.files.image.path);
  cloudinary.v2.uploader
    .upload(
      req.files.image.path
      // {
      //   eager: [{ width: 400, crop: "scale" }]
    )
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.send(error);
    });
});

// Send every other request to the React app
// Define any API routes before this runs

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
