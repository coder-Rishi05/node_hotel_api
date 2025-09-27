const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { decrypt } = require("dotenv");

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

//

personSchema.pre("save", async (next) => {
  const person = this;
  // hash the password only if it has been modified (or is new)

  if (person.isModified("password")) return next();

  try {
    // hash password generate
    const salt = await bcrypt.genSalt(10);
    // hash password

    const hashPassword = await bcrypt.hash(person.password, salt);

    // override the plain password with the hashed one.
    person.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.method.comparePassword = async (candidatePassword) => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// creating person model.

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
