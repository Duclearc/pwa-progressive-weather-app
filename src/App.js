import React, { lazy, Suspense, useState } from 'react'
import { fetchWeather } from './fetchWeather'
import './App.css'

const WeatherCardComponent = lazy(() => import('./weatherCardComponent'));

const renderLoader = () => <p>Loading</p>;

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
                <Suspense fallback={renderLoader()}>
                    <WeatherCardComponent weather={weather} />
                </Suspense>
            )}
        </div>
    )
}

export default App