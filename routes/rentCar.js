const express = require("express");
const router = express.Router();
const pool = require("../public/javascripts/dbConnection");
var cars = [];
var locations = [];

class Car {
  constructor({
    ID_VOITURE,
    PLAQUE_IMMATRICULATION,
    MODELE,
    COULEUR,
    ETAT,
    URL_IMAGE,
    DESCRIPTION_VOITURE,
    PRIX_PAR_JOUR,
    CENTRE_POSITION,
  }) {
    this.id = ID_VOITURE;
    this.model = MODELE;
    this.color = COULEUR;
    this.location = CENTRE_POSITION;
  }
}

class Location {
  constructor({ ID_CENTRE, NOM, ADRESSE, LAT, LNG }) {
    this.id = ID_CENTRE;
    this.name = NOM;
    this.adress = ADRESSE;
    this.lat = LAT;
    this.lng = LNG;
  }
}

pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query(
    "SELECT * FROM VOITURE WHERE ETAT = ? ORDER BY MODELE",
    ["libre"],
    (err, results, fields) => {
      if (err) throw err;
      results.forEach((car) => {
        cars.push(new Car(car));
      });
    }
  );

  connection.query("SELECT * FROM CENTRE", (err, results, fields) => {
    if (err) throw err;
    results.forEach((location) => {
      locations.push(new Location(location));
    });
  });
  connection.release();
});

const redirectSignUp = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/signUp");
  } else {
    next();
  }
};

const computePrice = (startDate, endDate, pricePerDay) => {
  firstDate = new Date(startDate);
  secondDate = new Date(endDate);

  const timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays * pricePerDay;
};

router.get("/", redirectSignUp, (req, res, next) => {
  res.render("rentCar", {
    cars,
    locations,
    userId: true,
  });
});

router.post("/submit", redirectSignUp, (req, res, next) => {
  const { startDate, endDate, endLocation, startLocation, car } = req.body;
  let pricePerDays = 0;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const priceQuery = new Promise((resolve, reject) => {
      connection.query(
        "SELECT PRIX_PAR_JOUR FROM VOITURE WHERE ID_VOITURE = ?",
        car,
        (err, results, fields) => {
          if (err) reject(err);
          resolve(results[0].PRIX_PAR_JOUR);
        }
      );
    });

    priceQuery
      .then((pricePerDay) => {
        connection.query(
          "INSERT INTO LOCATION_VOITURE SET ?",
          {
            PRIX: computePrice(startDate, endDate, pricePerDay),
            DATE_DEPART: startDate,
            DATE_ARRIVEE: endDate,
            ID_CLIENT: req.session.userId,
            ID_VOITURE: car,
            CENTRE_DEPART: startLocation,
            CENTRE_ARRIVEE: endLocation,
          },
          (err, results, fields) => {
            if (err) throw err;
          }
        );

        connection.query(
          "UPDATE VOITURE SET ? WHERE ID_VOITURE = ?",
          [
            {
              ETAT: "enLocation",
              CENTRE_POSITION: endLocation,
            },
            car,
          ],
          (err, results, fields) => {
            if (err) throw err;
          }
        );

        connection.release();
      })
      .catch((err) => {
        throw err;
      });
  });

  res.redirect("/rent/car");
});

module.exports = router;
