import personService from "../services/persons"
import useEffect from "react"

const PersonForm = ({ newName, newNumber, persons, handleSubmitName, handleSubmitNumber, submit }) => {
    return (
      <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={handleSubmitName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleSubmitNumber} />
        </div>
        <div>
          <button 
          onClick={() => {
            
            const existingPerson = personService.getAll().then(response => {
              console.log(response.number)
            })
            console.log(existingPerson)
            }}
          type="submit">
            add
          
          </button>
        </div>
      </form>
    )
  }
  
  export default PersonForm