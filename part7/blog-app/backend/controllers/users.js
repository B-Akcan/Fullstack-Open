const usersRouter = require("express").Router()
const User = require("../models/user")
require("express-async-errors")
const bcrypt = require("bcrypt")
const { tokenExtractor, userExtractor } = require("../utils/middleware")

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

usersRouter.delete("/:id", async (request, response) => {
  const token = tokenExtractor(request)
  const user = await userExtractor(token)
  const userToBeDeleted = await User.findById(request.params.id)

  if (user.id !== userToBeDeleted.id)
    return response.status(401).json({error: "You are not authorized to delete this user"})

  await User.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

module.exports = usersRouter