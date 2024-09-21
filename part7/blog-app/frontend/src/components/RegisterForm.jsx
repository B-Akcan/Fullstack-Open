import { useState } from "react"
import userService from "../services/users"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Button, Paper, TextField } from "@mui/material"

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()

    const newUser = {
      username,
      password,
      name
    }

    const createdUser = await userService.create(newUser)
    dispatch(setNotificationAndClearWithTimeout(`User "${createdUser.name}" was created`, 5))

    setUsername("")
    setPassword("")
    setName("")

    navigate("/")
  }

  return (
    <Paper elevation={10} style={{ textAlign: "center", paddingTop: 5, paddingBottom: 15 }}>
      <h1>Create an account</h1>
      <form onSubmit={handleRegister}>
        <div style={{ paddingBottom: 5 }}>
          <TextField
            data-testid="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            label="Username"
            variant="outlined"
          />
        </div>
        <div style={{ paddingBottom: 5 }}>
          <TextField
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            variant="outlined"
          />
        </div>
        <div style={{ paddingBottom: 10 }}>
          <TextField
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Name"
            variant="outlined"
          />
        </div>
        <div style={{ paddingBottom: 10 }}>
          <Button type="submit" variant="contained">register</Button>
        </div>
      </form>
      <small>Already have an account? Login <Link to="/">here.</Link></small>
    </Paper>
  )
}

export default RegisterForm