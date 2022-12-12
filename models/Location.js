const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema(
  { location: { type: String, required: true } },
  { timestamps: true },
)

module.exports = mongoose.model("Location", LocationSchema)
