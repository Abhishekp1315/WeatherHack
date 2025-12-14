import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weather }) {
  if (!weather) return null;
  const { name, main, weather: weatherArr } = weather;
  const icon = weatherArr[0]?.icon;
  const description = weatherArr[0]?.description;
  const temp = main?.temp;
  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="weather-icon"
        />
        <div className="weather-info">
          <div className="temp">{Math.round(temp)}°C</div>
          <div className="desc">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay; 