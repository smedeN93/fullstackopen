const blogRouter = require("express").Router()
const Blog = require("../models/blog")


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
  response.status(200).json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const {title, author, url, likes} = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

  module.exports = blogRouter