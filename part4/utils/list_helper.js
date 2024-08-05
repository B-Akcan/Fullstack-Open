const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0

  blogs.forEach(blog => {
    sum += blog.likes
  })

  return sum
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let mostLiked = {}

  blogs.forEach(blog => {
    if (blog.likes > mostLikes)
    {
      mostLikes = blog.likes
      mostLiked = {...blog} 
    }
  })

  const result = {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
  return result
}

const mostBlogs = (blogs) => {
  let authors = []

  for (let i=0; i<blogs.length; i++)
  {
      let auth = authors.find(author => author.author === blogs[i].author)
      if (auth)
      {
        auth.num++
        authors = authors.filter(author => author.author !== blogs[i].author)
        authors.push(auth)
      }
      else
      {
        let newAuth = {
          author: blogs[i].author,
          num: 1
        }
        authors.push(newAuth)
      }
  }

  let mostBlogs = 0
  let mostBlogsAuthor = {}
  for (let i=0; i<authors.length; i++)
  {
    if (authors[i].num > mostBlogs)
    {
      mostBlogs = authors[i].num
      mostBlogsAuthor = {...authors[i]}
    }
  }

  const result  = {
    author: mostBlogsAuthor.author,
    blogs: mostBlogsAuthor.num
  }
  
  return result
}

const mostLikes = (blogs) => {
  let authors = []

  for (let i=0; i<blogs.length; i++)
  {
      let auth = authors.find(author => author.author === blogs[i].author)
      if (auth)
      {
        auth.likes += blogs[i].likes
        authors = authors.filter(author => author.author !== blogs[i].author)
        authors.push(auth)
      }
      else
      {
        let newAuth = {
          author: blogs[i].author,
          likes: blogs[i].likes
        }
        authors.push(newAuth)
      }
  }

  let mostLikes = 0
  let mostLikesAuthor = {
    author: undefined,
    likes: undefined
  }
  
  for (let i=0; i<authors.length; i++)
  {
    if (authors[i].likes > mostLikes)
    {
      mostLikes = authors[i].likes
      mostLikesAuthor = {...authors[i]}
    }
  }
  
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}