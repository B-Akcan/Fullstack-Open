const logger = require("./logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })
  else if (error.name === "TypeError")
    return response.status(400).json({ error: error.message })
  else if (error.name === "JsonWebTokenError")
    return response.status(401).json({error: "token invalid"})
  else if (error.name === "TokenExpiredError")
    return response.status(401).json({error: "token expired"})

  next(error)
}

const tokenExtractor = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
}

const userExtractor = async (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  return user
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}