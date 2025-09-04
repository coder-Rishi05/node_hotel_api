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