import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'
import Language from './Language'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [icon, setIcon] = useState('')

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data)
        setIcon(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        )
      })
  }, [country.capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <Language key={language} language={language} />
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt='country flag' className='flag' />
      </div>
      {weather ? (
        <Weather country={country} weather={weather} icon={icon} />
      ) : null}
    </div>
  )
}
export default Country
