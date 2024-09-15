import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return <p>{notification}</p>
}

export default Notification
