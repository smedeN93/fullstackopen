const FindCountry = (props) => {

  const countries = props.filteredCountries;
  let content = null;

  if (countries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    
    content = (
      <div>
        {countries.map(country => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];

    
    const languageList = Object.values(country.languages).map(lang => (
      <li key={lang}>{lang}</li>
    ));

    content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>

        <h3>Languages:</h3>
        <ul>{languageList}</ul>

        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ width: '200px', marginTop: '20px' }}
        />
      </div>
    );
  } else {
    content = <p>No countries found</p>;
  }

  return (
    <div>
      <p>find country</p>
      <input
        placeholder="Search for a country..."
        onChange={props.handleCountryChange}
      />
      {content}
    </div>
  );
}

export default FindCountry;
