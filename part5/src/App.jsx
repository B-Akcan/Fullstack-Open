import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import NewBlog from './components/NewBlog'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
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
      const user = await loginService.login({username, password})
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

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = await blogService.create({title, author, url})
    setBlogs(blogs.concat(blog))
    setTitle("")
    setAuthor("")
    setUrl("")

    setMessage(`A new blog "${blog.title}" by "${blog.author}" was added`)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  if (user === null)
  {
    return (
      <div>
        <Message message={message} />
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
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
        <Blogs blogs={blogs} />
        <NewBlog handleNewBlog={handleNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
      </div>
    )
  }
}

export default App