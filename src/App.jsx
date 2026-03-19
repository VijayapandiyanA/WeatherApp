import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "fb8ce4645ef39634e1e322151ca720ea"; 

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const getTheme = () => {
    if (!weather) return "default";
    return weather.weather[0].main.toLowerCase();
  };

  const theme = getTheme();

  return (
    <div className={`app ${theme}`}>
      {/* ❄ Snow Effect */}
      {theme === "snow" && (
        <div className="snow-container">
          {Array.from({ length: 70 }).map((_, i) => (
            <span
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                opacity: Math.random()
              }}
            ></span>
          ))}
        </div>
      )}

      <div className="weather-box">
        <h1>🌦 Animated Weather</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <p>🌡 {weather.main.temp} °C</p>
            <p>🌥 {weather.weather[0].main}</p>
            <p>💧 {weather.main.humidity}%</p>
            <p>🌬 {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;








//  const API_KEY = "fb8ce4645ef39634e1e322151ca720ea";