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
    favoriteBlog
}