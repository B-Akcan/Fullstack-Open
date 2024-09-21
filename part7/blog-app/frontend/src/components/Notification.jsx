import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification)
  {
    return (
      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <Alert severity="success">{notification}</Alert>
      </div>
    )
  }
}

export default Notification
