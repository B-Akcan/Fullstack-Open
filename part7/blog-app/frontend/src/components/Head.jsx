import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"
import { Button, Paper } from "@mui/material"

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
    <Paper elevation={10} style={{ padding: 5 }}>
      <p style={{ textAlign: "center" }}>
        {user.name} logged in
        <Button onClick={handleLogout} variant="contained" style={{ marginLeft: 10 }}>
          Logout
        </Button>
      </p>
    </Paper>
  )
}

export default Head