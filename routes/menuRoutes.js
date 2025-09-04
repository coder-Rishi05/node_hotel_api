const express = require("express");
const MenuItem = require(".././models/MenuItem");

const router = express.Router();

// add menu
router.post("/", async (req, res) => {
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

// get menu

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("failed to get data", err);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

// get dynamic endpoint

router.get("/:taste", async (req, res) => {
  try {
    const itemTaste = req.params.taste;
    if (
      itemTaste === "sweet" ||
      itemTaste === "spicy" ||
      itemTaste === "sour"
    ) {
      const response = await MenuItem.find({ taste: itemTaste });

      console.log("response fethced");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (err) {
    console.log("Server Error", err);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

module.exports = router;
