### Server in node js.

---

`Server` : A server is a Person who communicates with clients.

`Analogy` -> server = waiter.

`Analogy` -> chef = database.

A server is a programme that is responsible for preparing and delivering data to other computers.

web pages, images, video or any additional information.

---

JSON : Javascript Object Notation.

Json is a way of sending the data as it is lightweight and easy to destrucutre.

json data and its conversion from object to json

```js
const jsonString = {"name":"rishi","age":"18"}
console.log(jsonObject.name)
```
json to object

```js
const jsonObject = JSON.parse(jsonString);
```

json is a type of string. it is easy to transfer from server to server.

---

server connects cleint and database.

/\*

\*/

// server only know the data which it have and defined for it. This is called endpoint.

// api => collection of endpoints is called api.

// creating a server.
// locoalhost :- it a a place where we create server.
// port number :- it is like a address number for the localhost

### Express JS

we use express to acess server. node already have capability to use server but express is used beacuse it is easy to use. express also use http which is include in node.

```
 express js

 to create server from express we first import it in our peoject

    npm i express.

 then we use take all the functionality of express into a variable

 ex:

 const express = require ("express:);
 // it will import the express.
 const app = express();
 // now we can use the express functionality using the app variable.


 now we have diffrent types of methods in app 1 of them is get method.

    the get method take 2 args(route path and callback function.)
    // the callback function have two args res, req. res used to send the value to the user

    app.get("/", (res,req)=>{
        res.send("<h1>This is my server</h1>");
    })

    // then we use port where we can access the web page.

    app.listen(3000,()=>{
        console.log("server is running );
    })

     get is having 2 parameter ("/", (callback))

 (/) used to get data.
 callback function ()=> :- we pass two arguments req and res where res is used to respond the request. here res is giving "hello world.";

 mthods to recieve and send data.

{
   get  => it is just used to request data from the server.  ex:- when we enter website url in browser browser send get request to server .
   post
   patch
   delete
}

```

<code>
 const express = require ("express:);
 const app = express();
// here in app we store express js. app used to acess and create server

    app.get("/", (res,req)=>{
        res.send("This is my server.");
    })

    // then we use port where we can access the web page.

    app.listen(3000,()=>{
        console.log("server is running );
    })

</code>


Local host : it means own computer.
port  => it is like a room where we run the server.



### notes

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




app.use(bodyParser.json()); // using body-parser

// here as soon as i will run the server my db.js will also setup the mongoDB server.

// when i open my server of mongoDB : it will say connect to server

// when i close my server of mongoDB : it will say Mongodb Disconnected.
