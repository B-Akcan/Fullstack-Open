import userService from "../services/users"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/userReducer"

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
    <div>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={handleSubmit}>yes</button>
      <button onClick={handleCancel}>no</button>
    </div>
  )
}

export default DeleteAccount