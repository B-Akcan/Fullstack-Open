import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ""
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationAndClearWithTimeout = (notification, seconds) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer