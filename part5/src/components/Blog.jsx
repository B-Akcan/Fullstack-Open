import { useState } from "react"

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const detailsStyle = { display: showDetails ? "" : "none" }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (blog) => {
    const newBlog = { ...blog }
    newBlog.likes++

    handleUpdateBlog(newBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{showDetails ? "hide" : "show"}</button>
      </div>
      <div style={detailsStyle} className="details">
        <p>
          url: {blog.url} <br/>
          likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button> <br/>
          user: {blog.userId.name} <br/>
          {username === blog.userId.username ?
            <button onClick={() => handleDeleteBlog(blog)}>delete blog</button> : ""}
        </p>
      </div>
    </div>
  )
}

export default Blog