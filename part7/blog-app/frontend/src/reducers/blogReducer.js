import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    modifyBlog(state, action) {
      const newState = state
      newState[newState.findIndex(e => e.id === action.payload.id)] = action.payload
      return newState
    },
    sortBlogs(state, action) {
      return state.sort(compareLikes)
    }
  }
})

export const { setBlogs, appendBlog, removeBlog, modifyBlog, sortBlogs } = blogSlice.actions

const compareLikes = (a, b) => {
  if (a.likes < b.likes) return 1
  else if (a.likes > b.likes) return -1
  return 0
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    dispatch(sortBlogs())
  }
}

export const newBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch(appendBlog(createdBlog))
    dispatch(sortBlogs())
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch(modifyBlog(updatedBlog))
    dispatch(sortBlogs())
  }
}

export default blogSlice.reducer