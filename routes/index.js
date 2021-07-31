var express = require("express");
var router = express.Router();
// const Product = require('../models/product').Product
const { Product } = require("../models/product");

/* GET home page. */
router.get("/", function (req, res, next) {
  Product.find({}, (err, products) => {
    res.render("index", { title: "Our Store", products });
  });
});

module.exports = router;
