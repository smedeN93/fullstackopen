import { useState } from 'react'
import Display from './Display'
import Button from './Button'

const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increasedByOne = () => {
    console.log("increasing, value before", counter)
    setCounter(counter + 1)
  }


  const decreasedByOne = () => {
    console.log("decreasing, value before", counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log("resetting to zero, value before", counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increasedByOne} text='plus' />
      <Button onClick={decreasedByOne} text='minus' />
      <Button onClick={setToZero} text='zero' />
    </div>
  )
}

export default App