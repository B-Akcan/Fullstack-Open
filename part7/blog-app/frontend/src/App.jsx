import { useState, useEffect } from "react"
import Head from "./components/Head"
import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"
import DeleteAccount from "./components/DeleteAccount"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import { getLoggedInUser } from "./reducers/userReducer"
import { Routes, Route, useMatch, Link } from "react-router-dom"
import userService from "./services/users"

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(users => setUsers(users))
  }, [])

  const userMatch = useMatch("/users/:id")
  const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch("/blogs/:id")
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  if (loggedUser === null) {
    return (
      <div>
        <Notification />

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    )
  } else {
    return (
      <div>
        <Link to="/" style={ { padding: 5 } }>blogs</Link>
        <Link to="/users" style={ { padding: 5 } }>users</Link>
        <Link to="/deleteAccount" style={ { padding: 5 } }>delete account</Link>

        <Notification />
        <Head />

        <Routes>
          <Route path="/" element={
            <>
              <NewBlog  />
              <Blogs />
            </>
          } />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route path="/deleteAccount" element={<DeleteAccount id={loggedUser.id} />} />
        </Routes>
      </div>
    )
  }
}

export default App
