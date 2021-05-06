const express = require("express");
const router = express.Router();
const {client} = require("../db/db");

router.get("/", async (req, res, next) => {
  const facilities = await client.db('carbay').collection("facilities").find().toArray();
  res.json(facilities);
});

module.exports = router;