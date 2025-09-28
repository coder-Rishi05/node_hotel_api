const express = require("express");
const router = express.Router();
const Person = require(".././models/Person");

// post method to add a person

router.post("/signup", async (req, res) => {
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

// get method to get person data.

router.get("/", async (req, res) => {
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

router.get("/:workType", async (req, res) => {
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

// updating the data.

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

// deleting a data

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
 
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person deleted " });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
