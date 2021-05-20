const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "eijibiji",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.listen(3000, () => {
  console.log("server is started");
});
