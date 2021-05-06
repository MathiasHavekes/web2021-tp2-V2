const express = require("express");
const router = express.Router();
const {client} = require("../db/db");

router.post("/register/new/lease", async (req, res, next) => {
  res.json({test: "test"});
});

module.exports = router;

