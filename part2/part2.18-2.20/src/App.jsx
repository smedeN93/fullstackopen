import { useState, useEffect } from 'react'
import countryService from './services/fetchCountry'
import getWeather from './services/getWeather'
import FindCountry from "./components/FindCountry"


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // Fetch all countries when loading the page
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, []) // Empty array means this runs once when component loads

  // Fetch weather data whenever a country is selected
  useEffect(() => {
    if (selectedCountry) {
      getWeather
      .getWeather(selectedCountry.capital)
      .then(response => {
        setWeather(response)
      })
    }
  }, [selectedCountry]) // Runs whenever selectedCountry changes

  // Handler for search input changes
  const handleCountryChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Filter countries based on search term
  const countryByName = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )
  console.log(countryByName)

  // Automatically select country when there's exactly one match
  useEffect(() => {
    if (countryByName.length === 1) {
      setSelectedCountry(countryByName[0])
    }
  }, [countryByName])

  return (
    <div>
      <h1>countries</h1>
      <FindCountry 
        countryByName={countryByName} 
        handleCountryChange={handleCountryChange} 
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}

export default App
