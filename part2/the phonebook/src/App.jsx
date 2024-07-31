import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from './components/Notification'
import * as personServices from "./services/persons"
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [shownPersons, setShownPersons] = useState([])
  const [message, setMessage] = useState({text: "", type: ""})

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setShownPersons(Array(initialPersons.length).fill(true))
      })
  }, [])

  const submitHandler = (event) => {
    event.preventDefault()
    
    let exists = false
    for (let i=0; i<persons.length; i++)
    {
      if (newName === persons[i].name)
        exists = true
    }

    if (!exists)
    {
      const obj = {name: newName, number: newNumber, id: (persons.length + 1).toString()}

      personServices
      .newPerson(obj)
      .then(() => {
        setPersons(persons.concat(obj))
        setShownPersons(shownPersons.concat(true))
        setMessage({text: `Added ${newName}`, type: "success"})
      })
    }
    else
    {
      const obj = {...persons.find(person => person.name === newName)}
      obj.number = newNumber

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        personServices
        .updatePerson(obj.id, obj)
        .then(() => {
          const newPersons = [...persons]
          newPersons.find(person => person.id === obj.id).number = newNumber
          setPersons(newPersons)
          setMessage({text: `Changed number of ${newName}`, type: "success"})
        })
      }
    }

    setNewName("")
    setNewNumber("")
  }

  const searchHandler = (event) => {
    const newShownPersons = [...shownPersons]

    for (let i=0; i<persons.length; i++)
    {
      if (event.target.value === "" || persons[i].name.toLowerCase().includes(event.target.value.toLowerCase()))
        newShownPersons[i] = true
      else
        newShownPersons[i] = false
    }

    setShownPersons(newShownPersons)
  }

  const deleteHandler = (id) => {
    const personName = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${personName}?`))
    {
      personServices
      .deletePerson(id)
      .then(() => {
        const index = persons.indexOf(persons.filter(person => person.id === id)[0])

        const newPersons = [...persons]
        newPersons.splice(index, 1)
        setPersons(newPersons)

        const newShownPersons = [...shownPersons]
        newShownPersons.splice(index, 1)
        setShownPersons(newShownPersons)

        setMessage({text: `Deleted ${personName}`, type: "success"})
      })
      .catch(() => {
        const index = persons.indexOf(persons.filter(person => person.id === id)[0])

        const newPersons = [...persons]
        newPersons.splice(index, 1)
        setPersons(newPersons)

        const newShownPersons = [...shownPersons]
        newShownPersons.splice(index, 1)
        setShownPersons(newShownPersons)
        
        setMessage({text: `Information of ${personName} has already been removed from server`, type: "failure"})
      })
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage}/>
      <Filter searchHandler={searchHandler} />

      <h3>Add a new</h3>
      <PersonForm submitHandler={submitHandler} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>

      <h3>Numbers</h3>
      <Persons persons={persons} shownPersons={shownPersons} deleteHandler={deleteHandler}/>  
    </div>
  )
}

export default App
