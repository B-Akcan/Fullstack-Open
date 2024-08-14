import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import NewBlog from "./components/NewBlog"
import Message from "./components/Message"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const togglableRef = useRef()

  const compareLikes = (a, b) => {
    if (a.likes < b.likes)
      return 1
    else if (a.likes > b.likes)
      return -1
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compareLikes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try
    {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
    }
    catch
    {
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  const handleNewBlog = async (newBlog) => {
    togglableRef.current.toggleVisibility()

    const blog = await blogService.create(newBlog)
    const newBlogs = blogs.concat(blog)
    newBlogs.sort(compareLikes)
    setBlogs(newBlogs)

    setMessage(`A new blog "${blog.title}" by "${blog.author}" was added`)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const handleUpdateBlog = async (blog) => {
    const newBlog = await blogService.update(blog, blog.id)

    const newBlogs = [...blogs]
    newBlogs[newBlogs.findIndex(e => e.id === blog.id)] = { ...newBlog }
    newBlogs.sort(compareLikes)
    setBlogs(newBlogs)

    setMessage(`Blog with title ${blog.title} was updated`)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`))
    {
      await blogService.deleteBlog(blog.id)

      setBlogs(blogs.filter(blog_ => blog_.id !== blog.id))

      setMessage(`Blog with title ${blog.title} was deleted`)
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
  }

  if (user === null)
  {
    return (
      <div>
        <Message message={message} />
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }
  else
  {
    return (
      <div>
        <Message message={message} />
        <h1>Hello, {user.name}!</h1>
        <button onClick={handleLogout} >logout</button>

        <Togglable buttonText="create blog" ref={togglableRef}>
          <NewBlog handleNewBlog={handleNewBlog}/>
        </Togglable>
        <Blogs blogs={blogs} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} username={user.username} />
      </div>
    )
  }
}

export default App