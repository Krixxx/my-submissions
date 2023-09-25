import CountryListItem from './CountryListItem'

const CountryList = ({ filteredCountries, showCountry }) => {
  return (
    <div>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        filteredCountries.map((country) => (
          <CountryListItem
            key={country.name.common}
            country={country}
            showCountry={showCountry}
          />
        ))
      )}
    </div>
  )
}
export default CountryList
