import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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


  const handleSubmitName = (event) => {
    setNewName(event.target.value)
  }
  const handleSubmitNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={searchTerm}
        onChange={handleFilterChange}
        />
      </div>
      
      <h3>add a new</h3>
      <form onSubmit={submit}>
        <div>
          name: <input
            value={newName}
            onChange={handleSubmitName}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleSubmitNumber}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>      
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <div key={person.id}>
          {`${person.name} ${person.number}`}
        </div>
      )}
    </div>
  )
}

export default App