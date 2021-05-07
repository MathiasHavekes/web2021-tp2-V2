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
  res.json(information);
});

router.get("/user/leases", async (req, res, next) => {
  const leases = await client.db("carbay").collection("leases").find({client : req.session.userId}).toArray();
  for ( i = 0 ; i < leases.length ; i++){
    const facility = await client.db("carbay").collection("facilities").findOne({_id : ObjectId(leases[i].startFacility) });
    leases[i].Facility = facility.title;
    leases[i].AddressFacility  = facility.address;

    const car = await client.db("carbay").collection("cars").findOne({_id : ObjectId(leases[i].car)});
    leases[i].carModel = car.model;
    leases[i].carImage = car.image;
  } 
  console.log(leases);
  res.json(leases);
});

router.put("/user/account/updateInfo", async (req, res, next) => {
  let values = {$set : { surname : req.body.information.surname, name :  req.body.information.name, password : req.body.information.password }};
  let query = { _id : ObjectId(req.session.userId) };
  await client.db("carbay").collection("clients")
  .findOneAndUpdate(
      query,
      values,
      { new: true, upsert: true, returnOriginal: false });
  isUpdated = true;
  res.json({isUpdated});
});

module.exports = router;
