const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const logger = require("./utils/logger.js")
const config = require("./utils/config.js")
const middleware = require("./utils/middleware.js")
const blogsRouter = require("./controllers/blogs.js")
const usersRouter = require('./controllers/users.js')

logger.info("Connecting to", config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connection successful")
  })
  .catch(() => {
    logger.error("connection failed")
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
