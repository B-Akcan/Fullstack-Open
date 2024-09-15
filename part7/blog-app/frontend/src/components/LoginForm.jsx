import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../reducers/userReducer"
import { Link } from "react-router-dom"

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
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username:{" "}
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <small>Don't have an account? Create one <Link to="/register">here.</Link></small>
    </>
  )
}

export default LoginForm
