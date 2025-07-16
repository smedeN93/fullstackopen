const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test("it is possible to get all blogs", async () => {
    const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

    assert.deepStrictEqual(response.body.length, helper.initialBlogs.length)
})

test("the correct id is returned", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    response.body.forEach(blog => {
        assert.ok(blog.id, "Blog object should have an 'id' field")
        assert.strictEqual(blog._id, undefined, "Blog object should not have an '_id' field")
    })
})

test("it is possible to create a new blog post", async () => {
    const newBlog = helper.initialBlogs[0]
    
    const currentNumberOfEntries = await api
    .get("/api/blogs")
    
    await api
    .post("/api/blogs/")
    .send(newBlog)
    .expect(201)

    const updatedEntries = await api
    .get("/api/blogs/")
    .expect(200)

    assert.strictEqual(updatedEntries.body.length, currentNumberOfEntries.body.length + 1)
})

test("it is possible to delete a blog post", async () => {
    const blogsAtStart = await api
    .get("/api/blogs/")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    
    const blogToDelete = blogsAtStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await api
    .get('/api/blogs/')
    .expect(200)
    
    const titles = blogsAtEnd.body.map(b => b.title)
    console.log(titles)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length - 1)
})


test.only("it is possible to update a blog post", async () => {
    const blogsAtStart = await api
        .get("/api/blogs/")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    const blogToUpdate = blogsAtStart.body[0]
    
    const updatedBlogData = {
        title: "everything",
        author: "has", 
        url: "been updated",
        likes: 69
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(201)

    const blogsAfterUpdate = await api
        .get("/api/blogs/")
        .expect(200)
    
    const updatedBlog = blogsAfterUpdate.body.find(b => b.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.title, "everything")
    assert.strictEqual(updatedBlog.likes, 69)
})
