import { useState, useEffect } from 'react'

import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [countryInput, setCountryInput] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    if (!countries.length > 0) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          console.log('loading')
          setCountries(response.data)
        })
    }
  }, [])

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryInput.toLowerCase())
      )
    )
  }, [countryInput])

  const handleCountryInput = (event) => {
    const input = event.target.value
    setCountryInput(input)
  }

  const displayCountry = (name) => {
    setFilteredCountries(
      Array.of(countries.find((country) => country.name.common === name))
    )
  }

  return (
    <div>
      <Filter
        countryInput={countryInput}
        handleCountryInput={handleCountryInput}
      />
      <div>
        <div>
          {filteredCountries.length === 1 ? (
            <Country country={filteredCountries[0]} />
          ) : (
            <CountryList
              filteredCountries={filteredCountries}
              showCountry={displayCountry}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default App
