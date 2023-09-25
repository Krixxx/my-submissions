const CountryListItem = ({ country, showCountry }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => showCountry(country.name.common)}>show</button>
    </div>
  )
}
export default CountryListItem
