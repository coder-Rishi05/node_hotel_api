const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// creating/setup the schema/models.

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // mandatory field.
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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

// hash password before save
personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(person.password, salt);
    person.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// compare password method
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

// creating person model.
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
