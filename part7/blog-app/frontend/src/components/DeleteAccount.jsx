import userService from "../services/users"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"
import { Button, Paper } from "@mui/material"

const DeleteAccount = ({ id }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    await userService.deleteUser(id)
    dispatch(logout())
    navigate("/")
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <Paper elevation={10} style={{ textAlign: "center", paddingTop: 15, paddingBottom: 15 }}>
      <p>Are you sure you want to delete your account?</p>
      <Button onClick={handleSubmit} variant="contained" style={{ marginRight: 5 }}>Yes</Button>
      <Button onClick={handleCancel} variant="outlined">No</Button>
    </Paper>
  )
}

export default DeleteAccount