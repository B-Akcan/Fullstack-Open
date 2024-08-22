import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const anedoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },

    newAnecdote(state, action) {
      return state.concat(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, newAnecdote, setAnecdotes } = anedoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = {
      content,
      id: getId(),
      votes: 0
    }
    const createdAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(newAnecdote(createdAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    anecdote.votes++
    await anecdoteService.update(id, anecdote)
    dispatch(vote(anecdote))
  }
}

export default anedoteSlice.reducer