import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../reducers/userReducer"
import { Link } from "react-router-dom"
import { Button, Paper, TextField } from "@mui/material"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(login(username, password))
    setUsername("")
    setPassword("")
  }

  return (
    <Paper elevation={10} style={{ textAlign: "center", paddingTop: 5, paddingBottom: 15 }}>
      <h1>Sign into your account</h1>
      <form onSubmit={handleLogin}>
        <div style={{ paddingBottom: 5 }}>
          <TextField
            data-testid="username"
            variant="outlined"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            label="Username" />
        </div>
        <div style={{ paddingBottom: 10 }}>
          <TextField
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"/>
        </div>
        <div style={{ paddingBottom: 10 }}>
          <Button variant="contained" type="submit">login</Button>
        </div>
      </form>
      <small>Don't have an account? Create one <Link to="/register">here.</Link></small>
    </Paper>
  )
}

export default LoginForm
