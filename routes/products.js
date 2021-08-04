var express = require("express");
var router = express.Router();
const { Product } = require("../models/product");

/* GET the add form. */
router.get("/add", function (req, res, next) {
  res.render("productadd");
});
// Process the added product data
router.post("/add", function (req, res, next) {
  const data = req.body;
  const prod = new Product(data);
  if (prod.image) prod.image = "/images/" + prod.image;
  prod.save(function (err) {
    if (err) return processErrors(err, "productadd", req, res);
    res.redirect("/");
  });
});

/* GET the Edit form. */
router.get("/edit/:prodid", function (req, res, next) {
  const prodid = req.params.prodid;
  res.render("productadd");
});
// Process the edit product data
router.post("/edit/:prodid", function (req, res, next) {
  const data = req.body;
  const prod = new Product(data);
  if (prod.image) prod.image = "/images/" + prod.image;
  prod.save(function (err) {
    if (err) return processErrors(err, "productadd", req, res);
    res.redirect("/");
  });
});

/* GET the details form. */
router.get("/details/:prodid", function (req, res, next) {
  const prodid = req.params.prodid;
  Product.findById(prodid, (err, prod) => {
    if (err) console.log(err);
    res.render("productdetails", { prod });
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
