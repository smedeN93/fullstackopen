const PersonForm = ({ newName, newNumber, handleSubmitName, handleSubmitNumber, submit }) => {
    return (
      <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={handleSubmitName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleSubmitNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default PersonForm