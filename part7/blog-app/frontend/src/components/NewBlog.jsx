import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { newBlog } from "../reducers/blogReducer"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import Togglable from "./Togglable"


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
    <Togglable buttonText="create blog" ref={togglableRef}>
      <h2>New Blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:{" "}
          <input
            data-testid="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="titleInput"
          />
        </div>
        <div>
          author:{" "}
          <input
            data-testid="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="authorInput"
          />
        </div>
        <div>
          url:{" "}
          <input
            data-testid="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="urlInput"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default NewBlog
