const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", async (req, res, next) => {
  const conn = await db.connectToMongoDB();
  const facilities = await conn.collection("facilities").find().toArray();

  res.json(facilities);
});

module.exports = router;