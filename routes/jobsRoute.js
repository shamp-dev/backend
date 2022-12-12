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
    console.log(req.url)
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
    console.log(req.url)
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
    console.log(req.url)
    try {
      await Job.findByIdAndDelete(req.params.id)
      res.status(200).json("Job has been deleted")
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

// single job
router.get("/:id", async (req, res) => {
  console.log(req.url)
  try {
    const job = await Job.findById(req.params.id)
    res.status(200).json(job)
  } catch (err) {
    res.status(500).json(err)
  }
})

// job listings
router.get("/", async (req, res) => {
  console.log(req.url)

  const qNew = req.query.new

  try {
    let job

    if (qNew) {
      job = await Job.find().sort({ createdAt: -1 }).limit(5)
    } else if (Location) {
      job = await Job.find({
        location: {
          $in: [Location],
        },
      })
    } else {
      job = await Job.find()
    }

    res.status(200).json(job)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
