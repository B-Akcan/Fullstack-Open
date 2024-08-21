import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  return (
    <>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)

  const compareVotes = (a, b) => {
    if (a.votes < b.votes)
      return 1
    else if (a.votes > b.votes)
      return -1
    return 0
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compareVotes)
                .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </>
  )
}

export default AnecdoteList