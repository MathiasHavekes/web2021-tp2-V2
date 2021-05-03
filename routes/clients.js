const { ObjectID } = require("bson");
const express = require("express");
const router = express.Router();
const db = require("../db/db");

var clients = [
  {id: "1", nom: "Havekes", prenom: "Mathias", email: "123test@gmail.com", phone: "123"},
];

router.get("/compte", async (req, res, next) => {
  console.log('Bonjour');
  var _id = req.body._id;
  const conn = await db.connectToMongoDB();
  const information = await conn.collection("clients").findOne({_id: _id});
  res.json(information);
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body.user);
  var user = {name: req.body.user.name , surname:req.body.user.surname ,  emailAddress:req.body.user.emailAddress, password:req.body.user.password, phoneNumber:req.body.user.phoneNumber};
  
  const conn = await db.connectToMongoDB();

  const client = await conn.collection('clients').findOne({emailAddress: user.emailAddress}); 
  if (client != null) {
    console.log("Email already used");
  }
  else {
      await conn.collection("clients").insertOne(user);
      console.log("Document inserted");
  }
});

router.post("/signin", async (req,res,next) => {
  var credentials = {emailAddress: req.body.credentials.emailAddress , password: req.body.credentials.password};

  const conn = await db.connectToMongoDB();

  const client = await conn.collection('clients').findOne( 
    {
      $and: [
        { emailAddress: credentials.emailAddress },
        { password: credentials.password }
            ]
    }
  ); 

  if (client == null){
    console.log("Account inexsitant");
    // TODO when account is inexistant
  }
  else  {
    console.log("Account existant");
    // TODO when account exists
  }
});



module.exports = router;
