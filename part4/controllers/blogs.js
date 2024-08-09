const Blog = require("../models/blog")
const blogsRouter = require("express").Router()
require("express-async-errors")
const User = require("../models/user")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("userId", {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    userId: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(blog)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = {...request.body}
  await Blog.findByIdAndUpdate(request.params.id, newBlog)
  response.status(200).json(newBlog)
})

module.exports = blogsRouter