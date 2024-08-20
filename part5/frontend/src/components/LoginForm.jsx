import PropTypes from "prop-types"

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username: <input data-testid="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password: <input data-testid="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm