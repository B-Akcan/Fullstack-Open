const Blog = require("../models/blog")
const { tokenExtractor, userExtractor } = require("../utils/middleware")
const blogsRouter = require("express").Router()
require("express-async-errors")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("userId", {username: 1, name: 1})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const token = tokenExtractor(request)
  const user = await userExtractor(token)
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    userId: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  tokenExtractor(request, response)
  userExtractor(request, response)

  const user = request.user
  const blogToBeDeleted = await Blog.findById(request.params.id)

  if (user.id !== blogToBeDeleted.userId.toString())
    return response.status(401).json({error: "you are not authorized to delete this blog"})

  await Blog.findByIdAndDelete(blogToBeDeleted.id)
  user.blogs = user.blogs.splice(user.blogs.findIndex(blog => blog.id === blogToBeDeleted.id), 1)
  await user.save()
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = {...request.body}
  await Blog.findByIdAndUpdate(request.params.id, newBlog)
  response.status(200).json(newBlog)
})

module.exports = blogsRouter