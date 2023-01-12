const mongoose = require("mongoose")

const CandidateSchema = new mongoose.Schema(
  {
    applied: { type: Boolean, default: false },
    viewed: { type: Boolean, default: false },
    scheduled: { type: Boolean, default: false },
    interviewed: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
  },
  { timestamps: true, _id: true },
)

module.exports = mongoose.model("Candidate", CandidateSchema)
