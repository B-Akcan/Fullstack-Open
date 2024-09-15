const { beforeEach, describe, test, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const User = require("../models/user")
const app = require("../app")
const supertest = require("supertest")

const api = supertest(app)

describe("when database has 1 user", async () => {
  beforeEach(async () => {
    await User.deleteMany()
  
    const root = new User({
      username: "root",
      password: "1234"
    })
  
    await root.save()
  })

  test("a new user is added successfully", async () => {
    const newUser = {
      username: "test",
      password: "1234",
      name: "Test Test"
    }

    const initialUsers = await helper.getAllUsersInDB()

    await api
          .post("/api/users")
          .send(newUser)
          .expect(201)
          .expect("Content-Type", /application\/json/)
    
    const finalUsers = await helper.getAllUsersInDB()
    const finalUsernames = finalUsers.map(user => user.username)

    assert.strictEqual(finalUsers.length, initialUsers.length + 1)
    assert(finalUsernames.includes(newUser.username))
  })

  test("user with invalid username is not added", async () => {
    const newUser = new User({
      username: "a",
      password: "1234",
      name: "Test Test"
    })

    const initialUsers = await helper.getAllUsersInDB()

    await api
          .post("/api/users")
          .send(newUser)
          .expect(400)
    
    const finalUsers = await helper.getAllUsersInDB()

    assert.strictEqual(finalUsers.length, initialUsers.length)
  })

  test("user with invalid password is not added", async () => {
    const newUser = new User({
      username: "test",
      password: "1",
      name: "Test Test"
    })

    const initialUsers = await helper.getAllUsersInDB()

    await api
          .post("/api/users")
          .send(newUser)
          .expect(400)
    
    const finalUsers = await helper.getAllUsersInDB()

    assert.strictEqual(finalUsers.length, initialUsers.length)
  })
})

after(async () => await mongoose.connection.close())