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
// try {
//   console.log("Connected to MongoDB server");
// } catch (error) {
//   console.log(" MongoDB connection error : ", error);
// }

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
module.exports = db;

// Export the database connection.
