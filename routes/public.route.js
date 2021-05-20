const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/signin", (req, res) => {
  res.render("pages/signIn");
});

router.get("/signup", (req, res) => {
  res.render("pages/signUp");
});

module.exports = router;
