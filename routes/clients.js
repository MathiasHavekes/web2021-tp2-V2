const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const {client} = require("../db/db");

router.post("/signup", async (req, res, next) => {
  let user = {name: req.body.user.name, surname:req.body.user.surname, emailAddress:req.body.user.emailAddress, password:req.body.user.password, phoneNumber:req.body.user.phoneNumber};
  let isInserted = false;
  
  const userCheck = await client.db("carbay").collection('clients').findOne({ emailAddress: user.emailAddress }); 
  if (userCheck != null) {
    console.log("Email already used");
  } else {
    await client.db("carbay").collection("clients").insertOne(user);
    console.log("Document inserted");
    isInserted = true;
  }

  res.json({isInserted});
});

router.post("/signin", async (req, res, next) => {
  let credentials = { emailAddress: req.body.credentials.emailAddress, password: req.body.credentials.password };
  let isConnected = false;
  let userFullName = "";

  const user = await client.db("carbay").collection("clients").findOne
  ({
    $and: [
      { emailAddress: credentials.emailAddress },
      { password: credentials.password }
    ]
  }); 

  if (user == null) {
    console.log("Wrong credentials");
  } else  {
    console.log("Right credentials");
    req.session.userId = user._id;
    isConnected = true;
    userFullName = user.surname + " " + user.name;
  }
  
  res.json({isConnected, userFullName});
})

router.post("/signout", async (req, res, next) => {
  req.session.destroy();
  res.clearCookie("carbay_cookies");
})

router.get("/user/account", async (req, res, next) => {
  const information = await client.db("carbay").collection("clients").findOne({_id: ObjectId(req.session.userId)});
  console.log(information);
  res.json(information);
});

router.get("/user/account/updateInfo", async (req, res, next) => {

});

module.exports = router;
