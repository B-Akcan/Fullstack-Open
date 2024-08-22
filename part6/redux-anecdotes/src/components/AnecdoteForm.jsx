import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleNewAnecdote = async (event) => {
    event.preventDefault()

    const value = event.target.newAnecdote.value
    event.target.newAnecdote.value = ""
    dispatch(createAnecdote(value))

    dispatch(setNotification(`New anecdote ${value} created`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name='newAnecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm