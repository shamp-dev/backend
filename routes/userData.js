const User = require("../models/User")
const {
  verifyTokenAndAdmin,
  verifyTokenAndCandidate,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken")
const Jobs = require("../models/Jobs")

const router = require("express").Router()

// update
router.put(
  "/:id",
  verifyTokenAndAuthorization || verifyTokenAndAdmin,
  async (req, res) => {
    console.log(req.url)

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC,
      ).toString()
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      )
      res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

// delete
router.delete(
  "/:id",
  verifyTokenAndAuthorization || verifyTokenAndAdmin,
  async (req, res) => {
    console.log(req.url)

    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(400).json("User Deleted Successfully!")
    } catch (err) {
      res.status(500).json(err)
    }
  },
)

// approve
router.put("/approve", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.url)

  try {
    const jobs = await Jobs.findByIdAndUpdate(req.params.id, {
      $set: req.body.approved,
    })
    res.status(200).json(jobs)
  } catch (err) {
    res.status(500).json(err)
  }
})

// apply
router.put("/:id/apply", verifyTokenAndCandidate, async (req, res) => {
  console.log(req.url)
  try {
    const appliedJob = await Jobs.findByIdAndUpdate(req.params.id, {
      $set: req.body.applied,
    })
    res.status(200).json(appliedJob)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.url)

  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc

    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.url)

  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
