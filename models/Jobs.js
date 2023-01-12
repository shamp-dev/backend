const mongoose = require("mongoose")

const JobsSchema = new mongoose.Schema(
  {
    logo: { type: String },
    title: { type: String, required: true, minLength: 3, maxLength: 110 },
    slug: { type: String, required: true, unique: true, targetField: "title" },
    desc: { type: String, required: true, minLength: 200, maxLength: 1200 },
    designation: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    applied: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Job", JobsSchema)
