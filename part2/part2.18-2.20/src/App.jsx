import { useState, useEffect } from 'react'
import countryService from './services/fetchCountry'
import FindCountry from "./components/FindCountry"


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleCountryChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const countryByName = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )
  console.log(countryByName)

  return (
    <div>
      <h1>countries</h1>
      <FindCountry 
        countryByName={countryByName} 
        handleCountryChange={handleCountryChange} 
      />
    </div>
  )
}

export default App
