import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import ClipLoader from "react-spinners/ClipLoader";





function App() {
  let iconURL = 'http://openweathermap.org/img/wn/10d@2x.png'
  // Objeto para acceder a los iconos 
  const getIcon = (icon_id) => {
    return `http://openweathermap.org/img/wn/${icon_id}@2x.png`
  }

  const lang = 'es'
  const [watherDays, setwatherDays] = useState()
  const [isActive, setisActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState()
  const [latlong, setlatlong] = useState({})
  const [user, setUser] = useState()
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Juni",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  let latitude, longitude, day, month
  let tomorrow, tomorrow_2, tomorrow_3, year
  const apiKeyWeathermap = '205eefabcca76833ea7c7b111b4c123f'
  const apiKeyWeathermapDays = '72b43c9c72fcb90f7e2913dacaa7ab29'


  // Obtenemos nuestra localizacion.

  const getDay = () => {
    let newDate = new Date()
    day = newDate.getDate()
    month = newDate.getMonth() + 1
    year = newDate.getFullYear()
    let today = `${month + 1}-${day}-${year}`
    let nextDay = new Date(today)
    nextDay.setDate(nextDay.getDate() + 1)
    tomorrow = `${nextDay.getDate()}  ${monthNames[nextDay.getMonth()]}`
    nextDay.setDate(nextDay.getDate() + 1)
    tomorrow_2 = `${nextDay.getDate()}  ${monthNames[nextDay.getMonth()]}`
    nextDay.setDate(nextDay.getDate() + 1)
    tomorrow_3 = `${nextDay.getDate()}  ${monthNames[nextDay.getMonth()]}`

  }
  getDay()

  useEffect(() => {

    const success = (data) => {
      latitude = data.coords.latitude
      longitude = data.coords.longitude
      setlatlong({ latitude, longitude })
    }
    // Busca con el api del navegador, retorna un objeto.
    latitude = navigator.geolocation.getCurrentPosition(success)


  }, [])

  useEffect(() => {
    setLoading(true)

  }, [])



  useEffect(() => {
    if (latlong.latitude !== undefined) {

      const urlWeatherMap = `https://api.openweathermap.org/data/2.5/weather?lat=${latlong?.latitude}&lon=${latlong?.longitude}&appid=${apiKeyWeathermap}`
      const urlWeatherMapDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${latlong?.latitude}&lon=${latlong?.longitude}&appid=${apiKeyWeathermapDays}`
      axios.get(urlWeatherMapDays)
        .then(res => setwatherDays(res.data))
        .catch(err => console.log(err))
      axios.get(urlWeatherMap)
        .then(res => setWeather(res.data), setLoading(false))
        .catch(err => console.log(err))
    }
  }, [latlong])
  const toggle = () => setisActive(!isActive)
  const climaCambio = weather?.weather[0].main


  console.log(weather?.weather[0].main)
  const today_weather = {}


  return (

    <article className={climaCambio === 'Clouds' ? 'nubes' : climaCambio === 'Rain' ? 'lluvia' : climaCambio === 'Clear sky' ? 'sun' : 'App'}>
      {
        loading ? (<ClipLoader color={'#cbddff'} loading={loading} size={150} />)
          :
          (
            <div id='App'>
              <section className='today_weather'>
                <div className='item_flex'>
                  <div className='loc_flex'>
                    <h2>{`${day} de ${monthNames[month]}    ${weather?.name}   ${weather?.sys?.country}`}</h2>
                    <img src={getIcon(weather?.weather[0].icon)} />
                  </div>
                  <div className='description_flex'>
                    <ul>
                      <li> <b><FontAwesomeIcon icon={faTemperatureHalf} /> </b>{isActive ? `${((((weather?.main.temp - 273.15) * 9) / 5) + 32).toFixed(2)}` : `${(weather?.main.temp - 273).toFixed(2)}`} <b>{isActive ? '°F' : '°C'}</b></li>
                      <li><b><FontAwesomeIcon icon={faWind} /></b>  {weather?.wind.speed} <b> m/s</b></li>
                      <li><b><FontAwesomeIcon icon={faCloudSun} /> </b>  {weather?.weather[0].main}</li>
                      <li><b><FontAwesomeIcon icon={faDroplet} /> </b>  {weather?.main.humidity} <b> %</b></li>
                    </ul>
                    <div>
                      <label className='switch'>
                        <input type="checkbox" checked={isActive} onChange={toggle} />
                        <span className='slider' />
                      </label>
                      <h2>{isActive ? 'Farenheit' : 'Celsicius'}</h2>
                    </div>
                  </div>

                </div>
              </section><section className='three_days_weather'>
                <div className='days_weather'>
                  <div className='item_flex'>
                    <div className='loc_flex'>
                      <h2>{`${tomorrow} de ${monthNames[month]}    ${weather?.name}   ${weather?.sys?.country}`}</h2>
                      <img src={getIcon(watherDays?.list[8].weather[0].icon)} />
                    </div>
                    <ul>
                      <li> <b><FontAwesomeIcon icon={faTemperatureHalf} /> </b>{isActive ? `${((((watherDays?.list[8].main.temp - 273.15) * 9) / 5) + 32).toFixed(2)}` : `${(watherDays?.list[8].main.temp - 273).toFixed(2)}`} <b>{isActive ? '°F' : '°C'}</b></li>
                      <li><b><FontAwesomeIcon icon={faWind} /></b>  {watherDays?.list[8].wind.speed} <b> m/s</b></li>
                      <li><b><FontAwesomeIcon icon={faCloudSun} /> </b>  {watherDays?.list[8].weather[0].main}</li>
                      <li><b><FontAwesomeIcon icon={faDroplet} /> </b>  {watherDays?.list[8].main.humidity} <b> %</b></li>
                    </ul>
                  </div>
                </div>
                <div className='days_weather'>
                  <div className='loc_flex'>
                    <h2>{`${tomorrow_2} de ${monthNames[month]}    ${weather?.name}   ${weather?.sys?.country}`}</h2>
                    <img src={getIcon(watherDays?.list[16].weather[0].icon)} />
                  </div>
                  <ul>
                    <li> <b><FontAwesomeIcon icon={faTemperatureHalf} /> </b>{isActive ? `${((((watherDays?.list[16].main.temp - 273.15) * 9) / 5) + 32).toFixed(2)}` : `${(watherDays?.list[16].main.temp - 273).toFixed(2)}`} <b>{isActive ? '°F' : '°C'}</b></li>
                    <li><b><FontAwesomeIcon icon={faWind} /></b>  {watherDays?.list[16].wind.speed} <b> m/s</b></li>
                    <li><b><FontAwesomeIcon icon={faCloudSun} /> </b>  {watherDays?.list[16].weather[0].main}</li>
                    <li><b><FontAwesomeIcon icon={faDroplet} /> </b>  {watherDays?.list[16].main.humidity} <b> %</b></li>
                  </ul>
                </div>
                <div className='days_weather'>
                  <div className='loc_flex'>
                    <h2>{`${tomorrow_3} de ${monthNames[month]}    ${weather?.name}   ${weather?.sys?.country}`}</h2>
                    <img src={getIcon(watherDays?.list[24].weather[0].icon)} />
                  </div>
                  <ul>
                    <li> <b><FontAwesomeIcon icon={faTemperatureHalf} /> </b>{isActive ? `${((((watherDays?.list[24].main.temp - 273.15) * 9) / 5) + 32).toFixed(2)}` : `${(watherDays?.list[24].main.temp - 273).toFixed(2)}`} <b>{isActive ? '°F' : '°C'}</b></li>
                    <li><b><FontAwesomeIcon icon={faWind} /></b>  {watherDays?.list[24].wind.speed} <b> m/s</b></li>
                    <li><b><FontAwesomeIcon icon={faCloudSun} /> </b>  {watherDays?.list[24].weather[0].main}</li>
                    <li><b><FontAwesomeIcon icon={faDroplet} /> </b>  {watherDays?.list[24].main.humidity} <b> %</b></li>
                  </ul>
                </div>
              </section>
            </div>
          )
      }
    </article>
  )
}

export default App
