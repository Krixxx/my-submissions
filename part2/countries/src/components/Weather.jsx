const Weather = ({ country, weather, icon }) => {
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>temperature {weather.main.temp} Celsius</div>
      <div>
        <img src={icon} alt='weather icon' />
      </div>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}
export default Weather
