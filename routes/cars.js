const express = require("express");
const router = express.Router();
const {client} = require("../db/db");

router.get("/", async (req, res, next) => {
  const cars = await client.db('carbay').collection("cars").find({state: "free"}).toArray();
  res.json(cars);
});

module.exports = router;
