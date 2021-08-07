var serverOne = process.env.DATA_URL || "http://localhost:8050";

module.exports = function (req, res) {
  if (!req.user || req.user.role != "manager") {
    req.session.msg = "You are not allowed to acces the business data.";
    res.status(403).redirect("/");
  }
  res.render("data", { serverOne });
};
