const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// var redirectHomePage = (req, res, next) => {
//   if (req.session.userId) {
//     res.redirect("/");
//   } else {
//     next();
//   }
// };

// router.get("/", redirectHomePage, (req, res, next) => {
//   res.render("signup", { userId: false });
// });

// router.post("/submit", redirectHomePage, (req, res, next) => {
//   const { surname, name, phone, email, password, confirmedPassword } = req.body;

//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       "SELECT EMAIL FROM CLIENT WHERE EMAIL= ?",
//       [email],
//       (err, results, fields) => {
//         if (err) throw err;
//         if (results.length > 0) {
//           //TODO: rajouter un message d'erreur au client
//           console.log("Cet Email est deja utilisé");
//           res.redirect("/signUp");
//         }
//       }
//     );

//     if (err) throw err;
//     connection.query(
//       "INSERT INTO CLIENT SET ?",
//       {
//         NOM: name,
//         PRENOM: surname,
//         MOT_DE_PASSE: password,
//         EMAIL: email,
//         TELEPHONE: phone,
//       },
//       (err, results, fields) => {
//         if (err) throw err;
//         res.redirect("/logIn");
//       }
//     );
//     connection.release();
//   });
// });

module.exports = router;
