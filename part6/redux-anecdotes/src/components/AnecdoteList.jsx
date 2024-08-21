import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { removeMessage, setMessage } from "../reducers/notificationReducer"

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(vote(anecdote.id))

    dispatch(setMessage(`Anecdote ${anecdote.content} voted`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleVote}>vote</button>
        </div>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const compareVotes = (a, b) => {
    if (a.votes < b.votes)
      return 1
    else if (a.votes > b.votes)
      return -1
    return 0
  }

  return (
    <>
      {anecdotes.filter(anecdote => anecdote.content.includes(filter))
                .sort(compareVotes)
                .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </>
  )
}

export default AnecdoteList