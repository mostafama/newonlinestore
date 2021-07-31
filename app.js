var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Mongoose connection
const dbURL = "mongodb://localhost:27017/mystore";
const mongoose = require("mongoose");
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", function () {
  console.log("We're connected!");
});
// Used to create seed data
// const { Product } = require("./models/product");
// prod = new Product({
//   name: "The LEGO Ideas Book: Unlock Your Imagination",
//   description:
//     "Be inspired to create and build amazing models with your LEGO® bricks!",
//   price: 25.94,
//   image: "/images/book4.jpg",
// });
// prod.save();
// ---------------------------------------------
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);

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
