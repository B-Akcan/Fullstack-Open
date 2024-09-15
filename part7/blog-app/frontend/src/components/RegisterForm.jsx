import { useState } from "react"
import userService from "../services/users"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

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
    <>
      <h1>Create an account</h1>
      <form onSubmit={handleRegister}>
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
        <div>
          name:{" "}
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <button type="submit">register</button>
      </form>
      <small>Already have an account? Login <Link to="/">here.</Link></small>
    </>
  )
}

export default RegisterForm