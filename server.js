const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT ? process.env.PORT : 1000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  const url = req.url
  console.log(url)

  res.json("welcome to the backend")
})

app.listen(port, () => console.info(`backend: http://localhost:${port}`))
