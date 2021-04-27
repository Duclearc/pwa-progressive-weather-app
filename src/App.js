import React, { useState } from 'react'
import { fetchWeather } from './fetchWeather'
import './App.css'

const App = () => {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query)
            setWeather(data)
            setQuery('') // resets the input field
            console.log(data)
        }
    }

    return (
        <div className="main-container">
            <h1 className="main-title">Progressive <span className="strike">Web</span> Weather App</h1>
            <input
                type="text"
                className="search"
                placeholder="e.g. New York"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>
                            {weather.name}
                        </span>
                        <sup>
                            {weather.sys.country}
                        </sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>
                            &deg;C
                        </sup>
                    </div>
                    <div className="info">
                        <img
                            className="city-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                            alt={weather.weather[0].description}
                        />
                        <span className="city-temp-description">{weather.weather[0].description}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App