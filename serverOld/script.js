// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>This server is created by me.</h1>");
// });

// app.get("/chiken", (req, res) => {
//   res.send("this is chiken site");
// });

// app.get("/idli", (req, res) => {
//   var customize = {
//     name: "rava idli",
//     size: "10 cm dia",
//     is_sambhar: true,
//     is_chutney: false,
//   };
//   res.send(customize);
// });

// app.post("/chefData", (req, res) => {
//   res.send(console.log("data is received"));
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log("Server is running at port no. : ", port);
// });


const express = require("express");
const app = express();
// const Person = require("./models/Person");
const Person = require("./models/Person");
// importing db from db.js.

const MenuItem = require("./models/MenuItem");

const db = require("./db");

const bodyParser = require("body-parser");

// app.use(bodyParser.json); // here i was having error that body parser i split means

/*

✅ Fix:

body-parser no longer works as a single generic function — it’s been split into specific parsers like:

bodyParser.json() → parses JSON payloads

bodyParser.urlencoded({ extended: true }) → parses URL-encoded form data

const bodyParser = require("body-parser");

// Parse JSON requests
app.use(bodyParser.json());

// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));


*/

app.use(bodyParser.json()); // using body-parser

// here as soon as i will run the server my db.js will also setup the mongoDB server.

// when i open my server of mongoDB : it will say connect to server

// when i close my server of mongoDB : it will say Mongodb Disconnected.

app.get("/", function (req, res) {
  res.send("<h1>welcome to my Hotel ! How can i help you.</h1>");
});

// const port = 1200;

// post method to add a person

app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    //  Create a new Person document using the mongoose model
    const newPerson = new Person(data);
    // Save the new person to the databse.
    const response = await newPerson.save();
    res.status(200).json(response);
    console.log("data saved");
  } catch (error) {
    console.log("failed to get data", error);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    res.status(200).json(response);

    console.log("Menu data saved");
  } catch (error) {
    console.log("failed to get Menu data", error);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

// get method to get person data.

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("failed to get data", err);
    res.status(500).json({ error: "Internal Server Error " });
  }
});
app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("failed to get data", err);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

// dynamic routing in node

app.get("/person/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager"
    ) {
      const response = await Person.find({ work: workType });

      console.log("response fethced");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (err) {
    console.log("Server Error");
    res.status(500).json({ error: "Internal Server Error " });
  }
});

try {
  app.listen(4000, () => {
    console.log("server is running at port 4000 ...");
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
