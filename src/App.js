import React, { useState } from 'react';
import './App.css';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherByCity, fetchWeatherByCoords } from './weatherApi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    }
    setLoading(false);
  };

  const handleGeoLocate = async () => {
    setError('');
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        setWeather(data);
      } catch (err) {
        setError('Could not fetch weather for your location.');
        setWeather(null);
      }
      setLoading(false);
    }, () => {
      setError('Unable to retrieve your location.');
      setLoading(false);
    });
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>Search</button>
        <button type="button" onClick={handleGeoLocate} disabled={loading}>
          Use My Location
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
