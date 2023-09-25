const Filter = ({ countryInput, handleCountryInput }) => {
  return (
    <div>
      find countries
      <input value={countryInput} onChange={handleCountryInput} />
    </div>
  )
}
export default Filter
