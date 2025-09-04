const express = require("express");
const app = express();
// const Person = require("./models/Person");
const Person = require("./models/Person");
// importing db from db.js.
require("dotenv").config();
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

const db = require("./db");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("<h1>welcome to my Hotel ! How can i help you.</h1>");
});

// importing the router files

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

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
