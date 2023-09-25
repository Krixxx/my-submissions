import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterText = (event) => {
    setFilterText(event.target.value)
  }

  const displayMessage = (message, isError) => {
    setNotificationMessage(message)
    setIsError(isError)

    setTimeout(() => {
      setNotificationMessage(null)
      setIsError(false)
    }, 3000)
  }

  const addNewName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            )
            displayMessage(`Modified ${updatedPerson.name} number`, false)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            displayMessage(
              `Information of ${existingPerson.name} has already been removed from server`,
              true
            )
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            )
          })
      }
    } else {
      personsService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson))
        displayMessage(`Added ${createdPerson.name}`, false)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase())
  )

  const handleRemovalOf = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService.remove(id).then((removed) => {
        setPersons(persons.filter((n) => n.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter filterText={filterText} handleChange={handleFilterText} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={addNewName}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleRemovalOf={handleRemovalOf} />
    </div>
  )
}
export default App
