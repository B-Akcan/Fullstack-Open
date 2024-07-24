import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Title = ({ text }) => <h1>{text}</h1>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handler = (type) => {
    switch (type) {
      case "good":
        return () => setGood(good + 1)
      case "neutral":
        return () => setNeutral(neutral + 1)
      case "bad":
        return () => setBad(bad + 1)
    }
  }

  return (
    <div>
      <Title text={"give feedback"}/>
      <Button text={"good"} onClick={handler("good")}/>
      <Button text={"neutral"} onClick={handler("neutral")}/>
      <Button text={"bad"} onClick={handler("bad")}/>

      <Title text={"statistics"}/>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {good + neutral + bad}</p>
      <p>average: {(good - bad) / (good + neutral + bad)}</p>
      <p>positive: {good * 100.0 / (good + neutral + bad)}%</p>
    </div>
  )
}

export default App
