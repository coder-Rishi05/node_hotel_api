### Mongoose

Mongoose is an ODM library for mongoDB.

### Connecting mongoose with node js

1. Create a File db.js in the root folder.

2. The db.js file is essentially responsible for establishing a connection between your node application and
   your MongoDB database using Mongoose library.

3. To install mongoose

npm i mongoose.

### Conection step by step : (revise Daily)

1. Import Mongoose and define the MongoDB URL in the <b>db.js</b> file. First import the mongoose library and define the url to your MongoDB databse.

2. This url typically follow the format :

`(mongodb://<hostname> : <port>/</databaseName>)`
in our code the url will be like this

mongoURL = `mongodb://localhost:27017:/mydatabaseName`

here mydatabse name will be the name of mongoDB database.

3. Set up MongoDB Connection : Next we call mongoose.connect() to establish a connection to the MongoDB database using the url.

ex : mongoose.connect(mongoURL)

and same configuration options

(useNewUrlParser, useUnifiedTopology).

This step initializes the connection process but does not actually connect at this point.

ex :

// establish connection

mongoose.connect(mongoURL,{

useNewUrlParser:true,

useUnifiedTopology:true

})

4. Access the default Connection Object :

Mongoose maintain a default connection object representing the MongoDB connection. You retrieve this object using mongoose.connection, you have stored it in the variable db. This object is what you will use to handle events and interact with the databse.

5. Define Event Listners :

You define event listners for the database connection using methods like .on(`connected`,...), .on(`error`,...), and .on(`disconnected`,...),

these events listners allow you to react diffrent states of the databse connection

6. Start listning event :

The code is set up to listen for events. When you call mongoose.connect(), Mongoose starts the connection process. If the connection is successed the .on(connected) method is triggered and you log message indicating that you are connected to MongoDB. If there is an error during connection process, the error event is triggered, and you log and error message.
Similarly the disconncet event is useful for handling situation where connection is lost.

7. Exports the database Connections :

Now we have to export the db object, which represent the MongoDB connection so that you can import and use it in the other part of you node js application.

summary :

the db.js file ascts as a central module that manage the connection to your MongoDB database using mongoose. It sets up the connection, handle connection events and export the connection object so that your express.js server can use it to interact with the database.

<h3>
When you server runs it typically require or import this db.js file to establish the databse connection before handling the http requests.
</h3>

### db.js file

```
const mongoose = require("mongoose");

// Define the MongoDB connection URL

const mongoURL = `mongodb://127.0.0.1:27017/hotels`; // replace mydatabse with your database name

// establish connection

// mongoose.connect(mongoURL, {
//   useNewUrlParser: true, // depricaiated
//   useUnifiedTopology: true, // depriciated
// });
mongoose.connect(mongoURL);

// get default connectiom
// Mongoose maintain a default connection object representing the MongoDB connection.

const db = mongoose.connection;

// define event listners for databse connection.

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
  console.log(" MongoDB connection error : ", err);
});
db.on("disconnected", () => {
  console.log("Mongodb Disconnected : ");
});

// Export the database connection.

module.exports = db;

```

### server.js file

const express = require("express");
const app = express();

// importing db from db.js.
const db = require("./db");

// here as soon as i will run the server my db.js will also setup the mongoDB server.
// when i open my server of mongoDB : it will say connect to server
// when i close my server of mongoDB : it will say Mongodb Disconnected.

app.get("/", function (req, res) {
res.send("<h1>welcome to my Hotel ! How can i help you.</h1>");
});

// const port = 1200;

try {
app.listen(4000, () => {
console.log("server is running at port 4000 ...");
});
} catch (err) {
console.log("error in creating server : ", err);
}

### mongodb server

- After running server and closing server of mongoDB

here as soon as i will run the server my db.js will also setup the mongoDB server.
when i open my server of mongoDB : it will say connect to server
when i close my server of mongoDB : it will say Mongodb Disconnected.

### models or schema

- model is like a blueprint for our database.
- Its a representation of a specific collection in MongoDB like a person
- once we defined a model you can create read update and delete doc in the mongoDB collection.
- mongoose allows you to define a schema for you document. A schema is structure of you databse.

ex :

Person Schema :

```

const mongoose = require("mongoose");

// creating/setup the schema/models.

const personSchema = new mongoose.Schema({
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
});


// creating person model.

const Person = mongoose.model('Person', personSchema);

module.exports = Person;


```

### Body Parser

npm i body-parser

- it is a middleware library for express.js
- it is used to parse and extract the body of incomming HTTP requests.
- When a client sends data to a server it includes data in the body of an http request.
- This data can be in various format such as json form data or URL encoded data.
- Body parser helps parse the data and extract the data from the request so that you can work with it in your Express.js application
- body parser process the request body before it reaches to the route handlers making the parsed data available in the

<b>req.body</b> for furthur processing.

- body parser automatically parse the json data from the request bosy and convert it into js object. which is then stores in the req.body
- Express uses a lot of middleware and to use middleware we use the app.use()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

### send data from client to server

we need an endpoint where the client sends data and data needs to be saved in the databse.

to this we need method called POST
now code the post method to add the person
mongoose only save predefined schema.

```

it is depriciated now

app.post("/person", (req, res) => {
  // getting data here

  const data = req.body; // assuming request body contains the person data.

  // create a new person document using the mongoose model.

//   const newPerson = new Person();
//    // this new person will now contain all the fields of person imported from person model.
//   newPerson.name = data.name;
//   newPerson.age = data.age;
//   newPerson.mobile = data.name;
//   newPerson.work = data.name;
//   newPerson.email = data.name;
//   newPerson.address = data.name;
//   newPerson.salary = data.name;
// });
  const newPerson = new Person(data); // this data contain all the fieldsby default

  newPerson.save((err,person)=>{
    if(err){
      console.log("error on saving the data : ", err);
      res.status(500).json(err," : Internal server error. "); // internal error code : 500

    }
    else{
      console.log("data saved successfully");
      res.status(200).json(person)
    }
  })

<!--  }) -->

```

### async and await with try and catch block

the async and await feature is useful for asyncronus code.
the try catch block also easily handle the async calls.

app.post("/person", async (req, res) => {
try {
const data = req.body;
// Create a new Person document using the mongoose model
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

- the try block contains the code for creating a new Person document and saving it to the databse using

await newPerson.save().

- If an error during any step. it is caught in the catch block and an error response is send with a 500 status code.

# Async

- An async function is a function that is designed to work with asychronous operations. You declare a function as async by placing the async keyword before the function declaration

- The primary purpose of an async function is to allow you to use the await keyword inside it, which simplifies working with promises and asynchronous code.

- inside an async function you can use await to pause the execution of the function until a promise is ressolved this makes the code appear moresynchronous and easier to read.

# Await

- The await keyword is used inside an async function to wait for the resolution of a promise it can be only used within an async funtion

- When await is used the function paused at that line until the promise is resolved or rejected. This allows you to write code that appears sequential even though its performing async tasks.

- If the promise is ressolved the result of the promise is returned. if the promise is rejected it throws an error that can be caught using try...catch.

### Monoose validate schema in node js

if i fill data which is not according to my person schema or ani diffrence between capitalcase or small case or duplicate value like email or phone then my server will give error with status code of 500.

other wise it will run correctly.

### Crud operation and endpoints

📘 Node.js CRUD Basics (with MongoDB & Express)

CRUD stands for Create, Read, Update, Delete – the four basic operations we perform on a database.
In backend development, CRUD operations are handled using HTTP methods.

🔑 Mapping of CRUD to HTTP Methods

```
| Database Operation | HTTP Method     | Example Purpose        |
| ------------------ | --------------- | ---------------------- |
| **Create**         | `POST`          | Add a new record       |
| **Read**           | `GET`           | Fetch records          |
| **Update**         | `PUT` / `PATCH` | Modify existing record |
| **Delete**         | `DELETE`        | Remove a record        |

```

📝 CRUD Breakdown

1. Create (POST)

Used to add a new entry in the database.

Example: Adding a new user.

// server.js

```
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/crudDB");

// Schema
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemSchema);

// CREATE route
app.post("/items", async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.send("Item created successfully!");
});

app.listen(3000, () => console.log("Server running on port 3000"));

```

📌 Notes:

Always send data in JSON format in the request body.

Example Request:

.json

```
POST /items
{
  "name": "New Item"
}


```

---

2. Read (GET)

// READ route
app.get("/items", async (req, res) => {
const items = await Item.find();
res.json(items);
});

📌 Notes:

GET request does not require a body.

Data is usually returned in JSON format.

---

3. Update (PUT / PATCH)

PUT replaces the entire document.

PATCH updates only specific fields.

// UPDATE route
app.put("/items/:id", async (req, res) => {
await Item.findByIdAndUpdate(req.params.id, { name: req.body.name });
res.send("Item updated successfully!");
});

📌 Notes:

PUT → Full update.

PATCH → Partial update.

Example Request:

PUT /items/64d2a8e45a1f3b
{
"name": "Updated Item"
}

---

4. Delete (DELETE)

Used to remove data from the database.

// DELETE route
app.delete("/items/:id", async (req, res) => {
await Item.findByIdAndDelete(req.params.id);
res.send("Item deleted successfully!");
});

📌 Notes:

Deletes the document by ID.

Response confirms deletion.

---

📌 Summary Notes

CRUD = Create, Read, Update, Delete.

HTTP Mapping:

POST → Create

GET → Read

PUT/PATCH → Update

DELETE → Delete

These operations are the core of any backend app.

---

### creating schema for menu

```
const mongoose = require('mongoose')


const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:["sweet","spicy","sour"],
        required:true,
    },
    is_drink:{
        type:Boolean,
        required:true,
    },
    ingredients:{
        type:String,
        default:[],
        // enum:["chicken wings","spices","sauce"],
        required:true,
    },
    num_sales:{
        type:Number,
        default:0,
        required:true,
    },
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
```

### Node js routing

### Query params/ Parametrised api calls in node js

- Now if someone told you to give a list of people are only waiters
- Then we can create an enpoint like this

/person/chef
/person/waiter
/person/manager

but its not the correct way to create as many functions here we can use paramaterised endpoints.

it can be dynamically inserted into the URL when making a request to the api.

localhost:3000/person/:work

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

the :workType is a dynamic variable. : makes it dynamic

### Express router

- We have a lot of Endpoints in a single file server.js.

- This makes bad experience in code readability as well as code handling.

- Express Router is a way to modularize and organise your route handling code in an express.js application.

- so lets create a seperate file to manage endpoints /person and /menu

- Express router is like traffic cop for you web server.

- Express Router helps you organise and manaze these pages or endpoints in your web application. It's like creating seperate folders for diffrent type of tasks.

create a folder route ----> personRoute.js

person data

```


// create person data

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

// get person data

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

```

dynamic routing in node of person data

```
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
```

### using router express

const express = require('express')
const router = express.Router()

// create person data

router.post("/person", async (req, res) => {
try {
const data = req.body;
// Create a new Person document using the mongoose model
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

// get person data

router.get("/person", async (req, res) => {
try {
const data = await Person.find();
console.log("data fetched");
res.status(200).json(data);
} catch (err) {
console.log("failed to get data", err);
res.status(500).json({ error: "Internal Server Error " });
}
});

// dynamic routing in node

router.get("/person/:workType", async (req, res) => {
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

### update operation

- We will update our person record for that we will create an endpoint form where we are able to update record.
- for updation we need two things

  - Which record we want to update.
  - What exactly we want to update.

- <div> For update we will use <p style="color:red; font-size : 1.5rem;" >PUT</p> method </div> to create and end point.

- What is a unique identifier in a document in a collection ?

- It's /\_id which is given by mongodb itself we use to find the particular record which we want to update.

- and now we will send data like same as we did in Post method.

<b> ex: </b>

```
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from the URL parameter.
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
```

### delete operations

Now to delete the Person record we will use also create an endpoint from where we will be able to delete the record.

for delete we need to use one thing ?

- which record we want to delete.

homework
creating same for the menu ✅

### Hosting in node js.

## git and git hub

to remove any file if added mistakely
git rm -r --cached serverOld

npm i automatically install all the packages from the package.json

### Host MongoDB databse

### Dotenv .env

npm i dotenv

### Hosting node api

### Authentication and Authorization

Day - 8

<h2>MiddleWare</h2>

Imagine you are at 

middle ware function

logging in node



### authentication and authorisation