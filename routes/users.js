var express = require("express");
var router = express.Router();
const { User } = require("../models/user");
const processErrors = require("./processErrors");
const bcrypt = require("bcryptjs");
const { Customer } = require("../models/customer");
const switchUserRole = require("../models/switchUserRole");

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/* Post register page, to process the registration data. */
router.post("/register", function (req, res, next) {
  const user = new User(req.body);
  // Hash the password before saving it to the DB
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    // Replace the plain password with the hashed password
    user.password = hashedPassword;
    // Generate a random number for the customer Id
    const custId = Math.floor(Math.random() * 100000000);
    //  Create a customer object
    const customer = new Customer({ _id: custId });
    customer.save((err) => {
      // Save the customer data
      if (err) return processErrors(err, "register", req, res, req.body);
      user.customerId = custId;
      user.save(function (err) {
        // Save the user data
        if (err) return processErrors(err, "register", req, res, req.body);
        res.redirect("/");
      });
    });
  });
});

/* Switch the user role. */
router.get("/switchrole/:userId/:newRol", function (req, res, next) {
  // Check if the user is not logged in or the user is not a manager,
  // redirect to home page
  if (!req.user || req.user.role !== "manager") {
    req.session.msg = "You are not allowed to change user roles.";
    return res.redirect("/");
  }
  const userId = req.params.userId;
  if (!userId) return res.redirect("/");
  switchUserRole(userId, req.params.newRol, (err) => {
    req.session.msg = "User role changed.";
    if (err) {
      req.session.msg = err;
    }
    res.redirect("/");
  });
});
module.exports = router;
