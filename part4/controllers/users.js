const usersRouter = require("express").Router()
const User = require("../models/user")
require("express-async-errors")
const bcrypt = require("bcrypt")

usersRouter.post("/", async (request, response) => {
  const body = request.body

  if (body.password === undefined || body.password.length < 3)
    return response.status(400).json({ error: "invalid password" })

  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    passwordHash: passwordHash,
    name: body.name,
    blogs: []
  })

  const savedUser = await newUser.save()
  return response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 })
  return response.status(200).json(users)
})

module.exports = usersRouter