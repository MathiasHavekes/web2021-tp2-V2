const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Routes
const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouteur = require("./routes/logout");
const carRentingRouter = require("./routes/rentCar");
const userAccount = require("./routes/account");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: "carbay_cookies",
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: false,
    },
    secret: "carbay",
    saveUnitialized: false,
    resave: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouteur);
app.use("/rent/car", carRentingRouter);
app.use("/user/account", userAccount);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
