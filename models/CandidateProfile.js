const mongoose = require("mongoose")

const CandidateProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String },
    skills: { type: Array },
    email: { type: String, required: true },
    edu: { type: Array },
    exp: { type: String },
    bio: { type: String },
    history: { type: String },
    projects: { type: Array },
    certificates: { type: Array },
    hobbies: { type: String },
    award: { tyoe: Array },
    language: { type: Array },
    jobSeeker: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model("CandidateProfile", CandidateProfileSchema)
