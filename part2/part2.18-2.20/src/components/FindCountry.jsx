const FindCountry = (props) => {
  const countries = props.countryByName;
  const weather = props.weather;

  return (
    <div>
      <p>find country</p>
      {/* Search input for filtering countries */}
      <input
        placeholder="Search for a country..."
        onChange={props.handleCountryChange}
      />
      
      {/* Display message when too many countries match the search */}
      {countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* Display list of countries when 2-10 countries match the search */}
      {countries.length > 1 && countries.length <= 10 && (
        <div>
          {countries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              {/* Button to show information for a specific country */}
              <button onClick={() => props.setSelectedCountry(country)}>show</button>
              {/* Display country information when selected */}
              {props.selectedCountry?.name.common === country.name.common && (
                <div>
                  <h2>{country.name.common}</h2>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area} km²</p>
                  <p>Languages: {Object.values(country.languages).join(', ')}</p>
                  <img src={country.flags.png} className="img" />
                  {/* Display weather information for the capital city */}
                  <h3>Weather in {country.capital} is {weather.current.temp_c}°C</h3>
                  <img 
                  src={weather.current.condition.icon} 
                  className="img_weather"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Display information when exactly one country matches */}
      {countries.length === 1 && (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area} km²</p>

          <h3>Languages:</h3>
          <ul>
            {Object.values(countries[0].languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={countries[0].flags.png}
            className="img"
          />
        </div>
      )}

      {/* Display message when no countries match the search */}
      {countries.length === 0 && (
        <p>No countries found</p>
      )}
    </div>
  );
}

export default FindCountry;
