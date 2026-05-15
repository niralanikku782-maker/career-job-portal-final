const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: String,
  jobId: String,
  status: {
    type: String,
    default: "Applied"
  }
});

module.exports = mongoose.model("Application", applicationSchema);