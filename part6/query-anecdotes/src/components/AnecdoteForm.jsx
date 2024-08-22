import { useNotificationDispatch } from "../NotificationContext"
import { createAnecdote } from "../requests"
import { useQueryClient, useMutation } from "@tanstack/react-query"

const getId = () => {
  return Number(Math.random() * 1000000).toFixed(0).toString()
}

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      notificationDispatch({type: "SET_MESSAGE", payload: "Too short anecdote, must have length 5 or more"})
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = {
      content,
      id: getId(),
      votes: 0
    }
    newAnecdoteMutation.mutate(newAnecdote)

    notificationDispatch({type: "SET_MESSAGE", payload: `A new anecdote ${newAnecdote.content} added`})
    setTimeout(() => {
      notificationDispatch({type: "CLEAR_MESSAGE"})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
