const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token

  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Invalid Token")
      res.user = user
      next()
    })
  } else {
    return res.status(401).json("Authentication Error")
  }
}

const verifyTokenAndEmployer = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.user.isEmployer) next()
    else res.status(403).json("Permission Denied")
  })
}

const verifyTokenAndCandidate = (req, res, next) => {
  verifyToken(req, res),
    () => {
      if (req.user.id !== req.user.isEmployer) next()
      else res.status(403).json("Permission Denied")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next()
    else res.status(403).json("Permission Error")
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next()
    else res.status(403).json("Admins Only")
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndEmployer,
  verifyTokenAndCandidate,
}
