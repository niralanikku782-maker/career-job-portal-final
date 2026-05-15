const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

router.get("/apply/:id", async (req, res) => {
  await Application.create({
    userId: req.session.user._id,
    jobId: req.params.id
  });

  res.send("Applied Successfully");
});

module.exports = router;