const express = require("express");
const router = express.Router();
const pool = require("../public/javascripts/dbConnection");
var cars = [];
var isOnline = false;

class Destination {
  constructor(src, title, description) {
    this.src = src;
    this.title = title;
    this.description = description;
  }
}

const destinations = [
  new Destination("images/gaspesie.jpg", "La Gaspésie", "Venez faire le tour de la Gaspésie."),
  new Destination("images/mont_tramblant.jpg", "Le Mont Tramblant", "Ne vous en faites pas, le mont ne tremble pas vraiment."),
  new Destination("images/quebec.jpg", "Québec", "Vous en aurrez plus que le bout de votre bec !"),
  new Destination("images/hiver_quebec.jpg", "L'expérience hivernale", "Il va juste faire un peu plus froid."),
];

class Car {
  constructor({
    ID_VOITURE,
    PLAQUE_IMMATRICULATION,
    MODELE,
    COULEUR,
    ETAT,
    URL_IMAGE,
    DESCRIPTION_VOITURE,
  }) {
    this.src = URL_IMAGE;
    this.title = MODELE;
    this.description = DESCRIPTION_VOITURE;
  }
}

pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query(
    "SELECT * FROM VOITURE GROUP BY MODELE ORDER BY MODELE",
    (err, results, fields) => {
      if (err) throw err;
      results.forEach((car) => {
        cars.push(new Car(car));
      });
    }
  );
  connection.release();
});

var isOnline = (userId) => {
  if (userId >= 0) {
    return true;
  } else {
    return false;
  }
};

router.get("/", (req, res, next) => {
  res.render("index", {
    destinations,
    cars,
    userId: isOnline(req.session.userId),
  });
});

module.exports = router;
