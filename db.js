const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB connection URL

const mongoURL = "mongodb://127.0.0.1:27017/hotels"; // replace mydatabse with your database name
//
// const mongoURL =
//   "mongodb+srv://rishabhrawat1800_db_user:sOg4oAGzdqqPmlch@cluster0.mnvlpnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//atlas

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
  console.log("Connected to MongoDB local server");
});
db.on("error", (err) => {
  console.log(" MongoDB connection error : ", err);
});
db.on("disconnected", () => {
  console.log("Mongodb Disconnected : ");
});
module.exports = db;

// Export the database connection.
