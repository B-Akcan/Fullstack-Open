import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import { setNotificationAndClearWithTimeout } from "./notificationReducer"
import blogService from "../services/blogs"
import userService from "../services/users"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
    } catch {
      dispatch(setNotificationAndClearWithTimeout("Wrong username or password", 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(clearUser())
    blogService.setToken(null)
    userService.setToken(null)
    window.localStorage.removeItem("loggedBlogAppUser")
  }
}

export const getLoggedInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }
}

export default userSlice.reducer