const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const jobsRoute = require("./routes/jobsRoute")
const userAuth = require("./routes/userAuth")
const userData = require("./routes/userData")

const app = express()
const port = process.env.PORT ? process.env.PORT : 8080

mongoose.set("strictQuery", false)

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connection successfull!")
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
  const url = req.url
  console.log(url)

  res.json(
    `Hello Admin! Welcome to the server - http://localhost:${port + url} - `,
  )
})
app.use("/api/jobs", jobsRoute)
app.use("/api/auth", userAuth)
app.use("/api/users", userData)

app.listen(
  port,
  console.info(`backend server is running on http://localhost:${port}`),
)
