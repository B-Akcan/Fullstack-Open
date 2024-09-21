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
import { Grid2 as Grid, AppBar, Toolbar } from "@mui/material"

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs])

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(users => setUsers(users))
  }, [users])

  const userMatch = useMatch("/users/:id")
  const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch("/blogs/:id")
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  if (loggedUser === null) {
    return (
      <Grid container spacing={2} columns={12} style={{ fontFamily: "Inria Sans", fontWeight: 400, fontStyle: "normal" }}>
        <Grid size={4}></Grid>
        <Grid size={4}>
          <div>
            <h1 style={{ textAlign: "center", fontSize: 60, fontStyle: "italic", color: "#0275d8" }}>Blog App</h1>
          </div>
        </Grid>
        <Grid size={4}></Grid>

        <Grid size={4}></Grid>
        <Grid size={4}>
          <Notification />
        </Grid>
        <Grid size={4}></Grid>

        <Grid size={4}></Grid>
        <Grid size={4}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Grid>
        <Grid size={4}></Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={2} columns={12} style={{ fontFamily: "Inria Sans", fontWeight: 400, fontStyle: "normal" }}>
        <Grid size={4}></Grid>
        <Grid size={4}>
          <AppBar position="static">
            <Toolbar style={{ textAlign: "center", margin: "auto" }}>
              <h2 style={{ marginRight: 20, fontStyle: "italic" }}>Blog App</h2>
              <Link to="/" className="link" style={{ marginRight: 10 }}>Blogs</Link>
              <Link to="/users" className="link" style={{ marginRight: 10 }}>Users</Link>
              <Link to="/deleteAccount" className="link" style={{ marginRight: 10 }}>Delete account</Link>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid size={4}></Grid>

        <Grid size={4}></Grid>
        <Grid size={4}>
          <Notification />
          <Head />
        </Grid>
        <Grid size={4}></Grid>

        <Grid size={4}></Grid>
        <Grid size={4}>
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
        </Grid>
        <Grid size={4}></Grid>
      </Grid>
    )
  }
}

export default App
