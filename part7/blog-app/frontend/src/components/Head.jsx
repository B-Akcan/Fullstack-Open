import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const Head = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate("/")
  }

  return (
    <div>
      <h1>Blog App</h1>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    </div>
  )
}

export default Head