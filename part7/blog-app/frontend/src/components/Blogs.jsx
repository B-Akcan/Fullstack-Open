import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
        </div>
      ))}
    </div>
  )
}

export default Blogs
