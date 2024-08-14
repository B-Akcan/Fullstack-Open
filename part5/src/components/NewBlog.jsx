import { useState } from "react"
import PropTypes from "prop-types"

const NewBlog = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const createNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }
    handleNewBlog(newBlog)

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title: <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

NewBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default NewBlog