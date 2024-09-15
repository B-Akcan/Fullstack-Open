import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBlog, deleteBlog } from "../reducers/blogReducer"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState("")

  const handleLike = (blog) => {
    const newBlog = { ...blog }
    newBlog.likes++

    dispatch(updateBlog(newBlog))
    dispatch(setNotificationAndClearWithTimeout(`Blog "${newBlog.title}" was liked`, 5))
  }

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotificationAndClearWithTimeout(`Blog "${blog.title}" was deleted`, 5))
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()

    if (comment === "")
    {
      dispatch(setNotificationAndClearWithTimeout("Please enter a proper comment!", 5))
      return
    }

    const commentedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }

    dispatch(updateBlog(commentedBlog))
    dispatch(setNotificationAndClearWithTimeout(`Added a comment to blog "${commentedBlog.title}"`, 5))

    setComment("")
  }

  if (!blog)
    return <p>This blog does not exist!</p>

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p>
        <a href={`//${blog.url}`} rel="external">{blog.url}</a> <br />
        <span data-testid="likes">{blog.likes} likes</span>{" "}
        <button onClick={() => handleLike(blog)}>like</button> <br />
        created by {blog.userId.name} <br />
        {user.username === blog.userId.username ? (
          <button onClick={() => handleDeleteBlog(blog)}>delete blog</button>
        ) : (
          ""
        )}
      </p>

      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type="submit">add comment</button>
      </form>
      {blog.comments.length !== 0 ?
        <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul> :
        <p>This blog does not have any comment.</p>}
    </div>
  )
}

export default Blog
