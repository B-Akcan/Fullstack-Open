import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const selectedHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const [anecdoteVotes, setAnecdoteVotes] = useState(Array(anecdotes.length).fill(0))
  const voteHandler = () => {
    const copy = [...anecdoteVotes]
    copy[selected] += 1
    setAnecdoteVotes(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {anecdoteVotes[selected]} votes</p>
      <Button text={"vote"} onClick={voteHandler}/>
      <Button text={"next anecdote"} onClick={selectedHandler}/>
    </div>
  )

}

export default App
