const router = require("express").Router();
const UserModels = require("../models/user.model");

router.get("/", (req, res) => {
  res.render("pages/home", { username: req.session.username });
});

router.get("/about", (req, res) => {
  res.render("pages/about", { username: req.session.username });
});

router.get("/signin", (req, res) => {
  res.render("pages/signIn");
});

router.get("/signup", (req, res) => {
  res.render("pages/signUp");
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  var user = await UserModels.findByUsername(username.toLowerCase());
  // console.log(user);
  if (user && user.password == password) {
    req.session.username = username;
    return res.redirect("/", { username: req.session.username });
  }
});

router.post("/signup", async (req, res) => {
  const { username, name, mobile, password } = req.body;
  //checking if username exists or not
  var isPresent = await UserModels.checkUserName(username.toLowerCase());
  if (isPresent) {
    res.redirect("/signup");
  }
  await UserModels.create({ ...req.body, username: username.toLowerCase() });
  req.session.username = username;
  res.redirect("/", { username: req.session.username });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.redirect("/signin");
});

module.exports = router;
