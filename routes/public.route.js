const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.session);

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

router.post("/signin", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/");
});

module.exports = router;
