const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username: <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password: <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm