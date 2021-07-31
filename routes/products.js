var express = require("express");
var router = express.Router();
const { Product } = require("../models/product");

/* GET the add form. */
router.get("/add", function (req, res, next) {
  res.render("addproduct");
});
// Process the added product data
router.post("/add", function (req, res, next) {
  const data = req.body;
  const prod = new Product(data);
  if (prod.image) prod.image = "/images/" + prod.image;
  prod.save(function (err) {
    if (err) return processErrors(err, "addproduct", req, res);
    res.redirect("/");
  });
});

function processErrors(errs, pageTemplate, req, res) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render(pageTemplate, {
    errors: errorArray,
    ...req.body,
  });
}

module.exports = router;
