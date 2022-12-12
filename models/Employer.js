const mongoose = require("mongoose")

const EmployerSchema = new mongoose.Schema(
  { postedJobs: { type: String } },
  { timestamps: true, _id: true },
)

module.exports = mongoose.model("Employer", EmployerSchema)
