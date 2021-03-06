var express = require("express");
var router = express.Router();
// const Product = require('../models/product').Product
const { Product } = require("../models/product");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user)
    req.user.userDetails.then((details) => {
      console.log("Index back", details);
    });
  Product.find({}, (err, products) => {
    res.render("index", { products });
  });
});

module.exports = router;
