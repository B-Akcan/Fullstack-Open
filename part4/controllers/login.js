const loginRouter = require("express").Router()
require("express-async-errors")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const bcrypt = require("bcrypt")

loginRouter.post("/", async (request, response) => {
  const {username, password} = request.body
  const user = await User.findOne({username: username})
  const passwordCorrect = user === null ? false : bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect))
    return response.status(401).json({error: "invalid username or password"})

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 3600})

  return response.status(200).json({token: token, username: user.username, name: user.name})
})



module.exports = loginRouter