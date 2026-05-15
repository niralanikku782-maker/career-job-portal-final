const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const multer = require("multer");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register user
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.redirect("/login");
});

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login user
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!match) return res.send("Wrong Password");

  req.session.user = user;

  res.redirect("/dashboard");
});
// Upload resume
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.session.user._id);

  user.resume = req.file.filename;
  await user.save();

  req.session.user = user;

  if (user.role === "recruiter") {
  res.redirect("/recruiter-dashboard");
} else {
  res.redirect("/dashboard");
}
});
// Dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.session.user._id);

  res.render("dashboard", { user });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});
module.exports = router;