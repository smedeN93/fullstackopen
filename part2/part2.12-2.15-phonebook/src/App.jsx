import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmitName = (event) => {setNewName(event.target.value)}
  const handleSubmitNumber = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setSearchTerm(event.target.value)}

  useEffect(() => {
    personService
    .getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  })

  const submit = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.some(person => person.number === newNumber);
    
    if (existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
      .update(existingPerson.id, newNumber)
      .then(response => {
        console.log(response)
      })
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService
    .create(newPerson)
    .then(response => {
      setPersons(persons.concat(response))
    })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmitName={handleSubmitName} handleSubmitNumber={handleSubmitNumber} submit={submit} />    
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App