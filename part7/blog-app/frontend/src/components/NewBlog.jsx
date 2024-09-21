import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { newBlog } from "../reducers/blogReducer"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import Togglable from "./Togglable"
import { TextField, Button, Paper } from "@mui/material"


const NewBlog = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()
  const togglableRef = useRef()

  const createNewBlog = (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    togglableRef.current.toggleVisibility()

    dispatch(newBlog(blog))
    dispatch(setNotificationAndClearWithTimeout(`A new blog "${blog.title}" by "${blog.author}" was added`, 5))

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <Paper elevation={10} style={{ padding: 5, marginBottom: 15 }}>
      <Togglable buttonText="Create a blog" ref={togglableRef}>
        <h2>Create a blog</h2>
        <form onSubmit={createNewBlog}>
          <div style={{ paddingBottom: 5 }}>
            <TextField
              data-testid="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id="titleInput"
              label="Title"/>
          </div>
          <div style={{ paddingBottom: 5 }}>
            <TextField
              data-testid="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              id="authorInput"
              label="Author"/>
          </div>
          <div style={{ paddingBottom: 10 }}>
            <TextField
              data-testid="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              id="urlInput"
              label="Url"/>
          </div>
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </Togglable>
    </Paper>
  )
}

export default NewBlog
