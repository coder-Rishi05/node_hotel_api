const express = require("express");
const app = express();
const Person = require("./models/Person");
const passport = require('passport')
const LocalStarategy = require('passport-local').Strategy;
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

// to verify the 
app.use(new LocalStarategy(async (username,password,done)=>{
  // authentication logic
  try {
    
  } catch (error) {
    
  }
}))

app.get("/", function (req, res) {
  // calling the function
  res.send("<h1>welcome to my Hotel ! How can i help you.</h1>");
});

// importing the router files

app.use("/person", logRequest, personRoutes);
app.use("/menu", logRequest, menuRoutes);

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT} ...`);
  });
} catch (err) {
  console.log("error in creating server : ", err);
}

/*

name: {
    type: String,
    required: true, // mandatory field.
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"], // for multiple values.
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // every time it will accept unique id only.
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },

*/
