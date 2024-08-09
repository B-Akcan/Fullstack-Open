const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
})

test("get request to the api/blogs url", async () => {
  const initialBlogs = helper.initialBlogs

  await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

  const finalBlogs = await helper.getAllBlogsInDB()
  
  assert.strictEqual(initialBlogs.length, finalBlogs.length)
})

test("unique identifier is named as id", async () => {
  const initialID = helper.initialBlogs[0]._id
  const blog = await Blog.findById(initialID)
  assert.strictEqual(blog.id, initialID)
})

test("post request", async () => {
  const initialBlogs = helper.initialBlogs

  const newBlog = {
    title: "Hello",
    author: "Batuhan Akçan",
    url: "example.com",
    likes: 3
  }
  await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
  
  const finalBlogs = await helper.getAllBlogsInDB()
  assert.strictEqual(finalBlogs.length, initialBlogs.length + 1)

  const blogTitle = finalBlogs[finalBlogs.length - 1].title
  assert.strictEqual(blogTitle, newBlog.title)
})

test("default value of likes is 0", async () => {
  const newBlog = {
    title: "Hi",
    author: "Batuhan Akçan",
    url: "example2.com",
  }

  await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
  const finalBlogs = await helper.getAllBlogsInDB()
  const newlyAddedBlog = finalBlogs[finalBlogs.length - 1]

  assert.strictEqual(newlyAddedBlog.likes, 0)
})

describe("missing: ", async () => {
  test("title", async () => {
    const newBlog = {
      author: "Batuhan Akçan",
      url: "example.com",
      likes: 4
    }
  
    await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(400)
  })
  
  test("url", async () => {
    const newBlog = {
      title: "Hello",
      author: "Batuhan Akçan",
      likes: 4
    }
  
    await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(400)
  })
})

describe("delete request", async () => {
  test("deletes a blog with a given id", async () => {
    const blogToDelete = helper.initialBlogs[0]
    await api
          .delete(`/api/blogs/${blogToDelete._id}`)
          .expect(204)

    const finalBlogs = await helper.getAllBlogsInDB()
    const finalBlogIDs = finalBlogs.map(blog => blog.id)
    assert(!finalBlogIDs.includes(blogToDelete._id))
  })

  test("gives 400 status code if an invalid id is given", async () => {
    const invalidID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    await api
          .delete(`/api/blogs/${invalidID}`)
          .expect(400)
  })
})

describe("put request", async () => {
  test("updates a blog with a given id", async () => {
    const blogToUpdate = helper.initialBlogs[0]
    const newBlog = {
      title: "Hello",
      author: "Batuhan Akçan",
      url: "example.com",
      likes: 5
    }

    await api
          .put(`/api/blogs/${blogToUpdate._id}`)
          .send(newBlog)
          .expect(200)

    const finalBlogs = await helper.getAllBlogsInDB()
    const finalBlogTitles = finalBlogs.map(blog => blog.title)
    assert(finalBlogTitles.includes(newBlog.title))
  })

  test("updates a blog partially", async () => {
    const blogToUpdate = helper.initialBlogs[0]
    const newBlog = {
      author: "Batuhan Akçan",
      likes: 5
    }

    await api
          .put(`/api/blogs/${blogToUpdate._id}`)
          .send(newBlog)
          .expect(200)
    
    const finalBlogs = await helper.getAllBlogsInDB()
    const finalBlogAuthors = finalBlogs.map(blog => blog.author)
    assert(finalBlogAuthors.includes(newBlog.author))
  })

  test("gives 400 status code if an invalid id is given", async () => {
    const invalidID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    await api
          .put(`/api/blogs/${invalidID}`)
          .expect(400)
  })
})


after(async () => await mongoose.connection.close())
