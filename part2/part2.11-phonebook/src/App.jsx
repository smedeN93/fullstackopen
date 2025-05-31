import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmitName = (event) => {setNewName(event.target.value)}
  const handleSubmitNumber = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setSearchTerm(event.target.value)}

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const submit = (event) => {
    event.preventDefault()
    
    const exists = persons.some(person => person.name === newName);
    
    if (exists) {
      return alert(`${newName} is already added to phonebook`)
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,

    }
    setPersons(persons.concat(newPerson))
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