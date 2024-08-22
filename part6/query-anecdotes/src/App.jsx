import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    anecdote.votes++
    updateAnecdoteMutation.mutate(anecdote)

    notificationDispatch({type: "SET_MESSAGE", payload: `Anecdote ${anecdote.content} voted`})
    setTimeout(() => {
      notificationDispatch({type: "CLEAR_MESSAGE"})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
