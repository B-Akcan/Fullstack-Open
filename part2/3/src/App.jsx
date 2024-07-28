import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({name}) => {
  return <h1>{name}</h1>
}

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </ul>
  )
}

const Part = ({name, exercises}) => {
  return <li>{name} {exercises}</li>
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)

  return (
    <b>total of {total} exercises</b>
  )
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
