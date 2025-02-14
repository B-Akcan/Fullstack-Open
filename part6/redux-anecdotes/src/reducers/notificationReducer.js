import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload
    },

    removeMessage(state, action) {
      return ""
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return async dispatch => {
    dispatch(setMessage(text))
    setTimeout(() => {
      dispatch(removeMessage())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer