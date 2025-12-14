const API_KEY = 'c92b00235917d2c7d019c4718bdc0f50'; // <-- Replace with your OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(city) {
  const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('City not found');
  return res.json();
}

export async function fetchWeatherByCoords(lat, lon) {
  const res = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('Location not found');
  return res.json();
} 