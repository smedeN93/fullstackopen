const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Peter"
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" age={26 + 10} />
      <Hello name={name} age={age} /> {/* Når man bruger argumenter i JSX, hvor der indgår noget JS, så skal man have dem indrammet i curly braces */ }
    </div>
  )
}

export default App
