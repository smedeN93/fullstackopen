import personService from "../services/persons"

const Persons = ({ persons }) => {
    return (
      <div>
        {persons.map(person =>
          <div key={person.id}>
            {`${person.name} ${person.number}`}
            <button onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)) {
                personService.deletePerson(person.id)
              }}}>
                Delete
            </button>
          </div>
        )}
      </div>
    )
  }
  
  export default Persons