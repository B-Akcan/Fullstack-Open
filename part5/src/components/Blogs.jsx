import Blog from "./Blog"
import PropTypes from "prop-types"

const Blogs = ({ blogs, handleUpdateBlog, handleDeleteBlog, username }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} username={username} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blogs