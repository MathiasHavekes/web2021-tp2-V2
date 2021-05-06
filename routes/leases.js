const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const {client} = require("../db/db");

router.post("/register/new", async (req, res, next) => {
  let startDate = req.body.leaseInfo.dates[0];
  let endDate = req.body.leaseInfo.dates[1];
  
  let values = {$set : { state: "inUse"}};
  let query = {_id: ObjectId(req.body.leaseInfo.car)};
  const car = await client.db('carbay').collection("cars").findOneAndUpdate(
    query, 
    values,
  );

  let pricePerDay = car.value.pricePerDay;

  let computeDates = function(startDate, endDate) {
    const timeDiff = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  let computePrice = function(leasePeriod, pricePerDay) {
    return leasePeriod * pricePerDay;
  }

  let newLease = { 
    client: req.session.userId,
    car: req.body.leaseInfo.car,
    startFacilty: req.body.leaseInfo.facilities.start, 
    endFacility: req.body.leaseInfo.facilities.end,
    startDate: startDate,
    endDate: endDate,
    period: computeDates(startDate, endDate),
    price: computePrice(computeDates(startDate, endDate), pricePerDay),
  };

  await client.db("carbay").collection("leases").insertOne(newLease)
    .then(() => {
      res.json({ isInserted: true, carModel: car.value.model });
    })
    .catch(err => {
      console.log(err);
      res.json({ isInserted: false });
    }); 
});

module.exports = router;

