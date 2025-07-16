const initialBlogs =[
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }
]

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((mostLikes, blog) => {
        return mostLikes.likes > blog.likes ? mostLikes : blog
    }, blogs[0])
    console.log(favorite)
    return favorite
}

const dummy = (blogs) => {
    return 1
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    initialBlogs
}