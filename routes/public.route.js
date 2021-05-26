const router = require("express").Router();
const UserModels = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", (req, res) => {
  res.render("pages/home", {
    username: req.session.username ? req.session.username : null,
  });
});

router.get("/about", (req, res) => {
  res.render("pages/about", {
    username: req.session.username ? req.session.username : null,
  });
});

router.get("/signin", (req, res) => {
  res.render("pages/signIn", {
    username: req.session.username ? req.session.username : null,
  });
});

router.get("/signup", (req, res) => {
  res.render("pages/signUp", {
    username: req.session.username ? req.session.username : null,
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  var user = await UserModels.findByUsername(username.toLowerCase());
  // console.log(user);
  if (user && user.password == password) {
    req.session.username = username;
    return res.redirect("/");
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
  res.redirect("/");
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.redirect("/signin");
});

module.exports = router;
