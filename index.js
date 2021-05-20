const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

const publicRoutes = require("./routes/public.route");

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "eijibiji",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", publicRoutes);

app.listen(3000, () => {
  console.log("server is started");
});
