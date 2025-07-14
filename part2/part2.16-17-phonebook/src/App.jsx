import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  // - persons: array to store all contacts
  // - newName: temporary storage for name input
  // - newNumber: temporary storage for phone number input
  // - searchTerm: what user types in search box
  // - notification: messages to show to user (success/error)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: '' });

  // Functions that run when user types in the input fields
  const handleSubmitName = (event) => {setNewName(event.target.value)}
  const handleSubmitNumber = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setSearchTerm(event.target.value)}

  // When the app starts, fetch all contacts from the server
  useEffect(() => {
    personService
    .getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }, [])

  // This function runs when the form is submitted
  const submit = (event) => {
    // Prevent the page from reloading
    event.preventDefault()
    
    // Check if this person already exists in our phonebook
    const existingPerson = persons.find(person => person.name === newName);
    
    // If person exists and user confirms, update their number
    if (existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      // Create updated version of the person
      const updatedPerson = { ...existingPerson, number: newNumber }
      
      // Send update to server and handle the response
      personService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          // Update the person in list
          setPersons(persons.map(person => 
            person.id === existingPerson.id ? response : person
          ))
          // Clear the input fields
          setNewName('')
          setNewNumber('')
          setNotification({ message: `Updated ${newName}`, type: 'update' })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
        .catch(error => {
          // Show error message if update fails
          if (error.response.data.error) {
            setNotification({ message: error.response.data.error, type: 'error' })
          } else {
            setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' })
          }
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
          setPersons(persons.filter(person => person.name !== newName))
        })
      return
    }

    // If person doesn't exist, create new contact
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    // Send new contact to server
    personService
      .create(newPerson)
      .then(response => {
        // Add new person to our list
        setPersons(persons.concat(response))
        // Clear input fields
        setNewName('')
        setNewNumber('')
        // Show success message
        setNotification({ message: `Added ${newName}`, type: 'success' })
        // Remove message after 5 seconds
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
      .catch(error => {
        if (error.response.data.error) {  
          setNotification({ message: error.response.data.error, type: 'error' })
        } else {
          setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' })
        }
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
    return
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotification({ message: `Deleted ${name}`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotification({ message: `Information of ${name} has already been removed from server`, type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  // Filter the contact list based on search term
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Display everything on the page
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter searchTerm={searchTerm} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmitName={handleSubmitName} handleSubmitNumber={handleSubmitNumber} submit={submit} />    
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App