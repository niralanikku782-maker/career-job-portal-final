const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.get("/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.render("jobs", { jobs });
});

router.get("/create-job", (req, res) => {
  res.render("createJob");
});

router.post("/create-job", async (req, res) => {
  const { title, company, description } = req.body;

  await Job.create({
    title,
    company,
    description
  });

  res.redirect("/jobs");
});

module.exports = router;

router.get("/recruiter-dashboard", async (req, res) => {
  const jobs = await Job.find();

  res.render("recruiterDashboard", { jobs });
});