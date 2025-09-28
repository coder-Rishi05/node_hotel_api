const express = require("express");
const app = express();
const Person = require("./models/Person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // LocalStrategy
require("dotenv").config();
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

const db = require("./db");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

// middleware

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.url} `);
  next(); // if next is not written it will not process furthur
};

app.use(logRequest); // using middleware

// to verify the username and password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // authentication logic
    try {
      console.log("Got password and username : ", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

app.use(passport.initialize()); // initializing the passport

const localAuthMidd = passport.authenticate("local", { session: false });

app.get("/", localAuthMidd, function (req, res) {
  // calling the function
  res.send("<h1>welcome to my Hotel ! How can i help you.</h1>");
});

// importing the router files

app.use("/person", logRequest, localAuthMidd,personRoutes);
app.use("/menu", localAuthMidd, menuRoutes);

const PORT = process.env.PORT || 3000;

app
  .listen(PORT)
  .on("listening", () => {
    console.log(`server is running at port ${PORT} ...`);
  })
  .on("error", (err) => {
    console.log("error in creating server : ", err);
  });
