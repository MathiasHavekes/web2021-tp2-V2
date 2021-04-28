const express = require("express");
const router = express.Router();

var redirectSignUp = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/signUp");
  } else {
    next();
  }
};

router.get("/", redirectSignUp, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect("/");
    }
  });
  res.clearCookie("carbay_cookies");
  res.redirect("/logIn");
});

module.exports = router;
