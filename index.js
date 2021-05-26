const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const publicRoutes = require("./routes/public.route");
const postRoutes = require("./routes/post.route");

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "eijibiji",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      retries: 0,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", publicRoutes);
app.use("/posts", postRoutes);

app.listen(3000, () => {
  console.log("server is started");
});
