import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBlog, deleteBlog } from "../reducers/blogReducer"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import { Button, Dialog, DialogActions, DialogTitle, Paper, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { List, ListItem } from "@mui/material"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const navigate = useNavigate()

  const handleLike = (blog) => {
    const newBlog = { ...blog }
    newBlog.likes++

    dispatch(updateBlog(newBlog))
    dispatch(setNotificationAndClearWithTimeout(`Blog "${newBlog.title}" was liked`, 5))
  }

  const handleDeleteBlog = (blog) => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotificationAndClearWithTimeout(`Blog "${blog.title}" was deleted`, 5))
    navigate("/")
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
    <Paper elevation={10} style={{ paddingTop: 5, paddingLeft: 25, paddingRight: 25, paddingBottom: 5 }}>
      <h2 style={{ textAlign: "center" }}>{blog.title} by {blog.author}</h2>

      <Paper elevation={5} style={{ marginBottom: 30, paddingLeft: 15, paddingRight: 15, paddingTop: 1, paddingBottom: 15 }}>
        <h3>About</h3>
        <div style={{ marginBottom: 5 }}>
          <Link href={`//${blog.url}`} rel="external" className="contentLink">{blog.url}</Link>
        </div>
        <div style={{ marginBottom: 5 }}>
          <span data-testid="likes" style={{ marginRight: 10, marginBottom: 10 }}>{blog.likes} likes</span>
          <Button onClick={() => handleLike(blog)} variant="contained">Like</Button>
        </div>
        <div style={{ marginBottom: 5 }}>
          created by <Link to={`/users/${blog.userId.id}`} className="contentLink">{blog.userId.name}</Link>
        </div>
        {user.username === blog.userId.username ? (
          <Button onClick={() => setDialogOpen(true)} variant="contained">delete blog</Button>
        ) : ""}
      </Paper>

      <Paper elevation={5} style={{ marginBottom: 30, paddingLeft: 15, paddingRight: 15, paddingTop: 1, paddingBottom: 15 }}>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <TextField value={comment} onChange={({ target }) => setComment(target.value)} style={{ marginRight: 10 }} />
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>add a comment</Button>
        </form>
        {blog.comments.length !== 0 ?
          <List>
            {blog.comments.map(comment => (
              <ListItem key={comment}>{comment}</ListItem>
            ))}
          </List> :
          <p>This blog does not have any comment.</p>}
      </Paper>

      <DeleteBlogDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} blog={blog} handleDeleteBlog={handleDeleteBlog} />
    </Paper>
  )
}

const DeleteBlogDialog = (props) => {
  return (
    <Dialog open={props.dialogOpen}>
      <DialogTitle>Are you sure you want to delete blog "{props.blog.title}"?</DialogTitle>
      <DialogActions>
        <Button onClick={() => props.handleDeleteBlog(props.blog)} variant="contained">yes</Button>
        <Button onClick={() => props.setDialogOpen(false)}>no</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Blog
