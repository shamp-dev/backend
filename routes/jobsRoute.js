const router = require("express").Router()
const {
  verifyTokenAndAdmin,
  verifyTokenAndEmployer,
} = require("../middlewares/verifyToken")
const Job = require("../models/Jobs")
const Location = require("../models/Location")

// Create
router.post(
  "/",
  verifyTokenAndEmployer || verifyTokenAndAdmin,
  async (req, res) => {
    const newJob = new Job(req.body)

    try {
      const savedJob = await newJob.save()
      res.status(200).json(savedJob)
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

// update
router.put(
  "/:id",
  verifyTokenAndEmployer || verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      )
      res.status(200).json(updatedJob)
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

// delete
router.delete(
  "/:id",
  verifyTokenAndEmployer || verifyTokenAndAdmin,
  async (req, res) => {
    try {
      await Job.findByIdAndDelete(req.params.id)
      res.status(200).json("Job has been deleted")
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

// single job
router.get("/:slug", async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug })
    res.status(200).json(job)
  } catch (err) {
    res.status(500).json(err)
  }
})

// job listings
router.get("/", async (req, res) => {
  try {
    const job = await Job.find()
    res.status(200).json(job)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
