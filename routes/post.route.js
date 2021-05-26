var router = require("express").Router();
var multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");
router.use(authMiddleware);

const PostModel = require("../models/post.model");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    var originalName = file.originalname;
    var ext = originalName.split(".").slice(-1)[0];
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

var upload = multer({ storage: storage });

router.get("/", (req, res) => {
  PostModel.getAllPostsForUser(req.session.username)
    .then((posts) =>
      res.render("pages/posts", {
        username: req.session.username ? req.session.username : null,
        posts: posts,
      })
    )
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  res.render("pages/posts");
});

router.get("/create", (req, res) => {
  res.render("pages/createPost", {
    username: req.session.username ? req.session.username : null,
  });
});

router.post("/create", upload.single("image"), (req, res) => {
  var { title, description } = req.body;
  var filename = req.file.filename;
  var author = req.session.username;
  PostModel.createPost(title, description, filename, author.toLowerCase()).then(
    (_) =>
      res.redirect("/posts").catch((err) => {
        console.log(err);
      })
  );
});

module.exports = router;
