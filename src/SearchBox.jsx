import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const API_URL = "https://api.openweathermap.org/geo/1.0/direct";
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

    let getWeatherInfo = async () => {
        try {
            let geoResponse = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let geoData = await geoResponse.json();

            // ✅ Check if city not found
            if (!geoData || geoData.length === 0) {
                throw new Error("City not found");
            }

            const { lat, lon, country } = geoData[0];

            let weatherResponse = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            let weatherData = await weatherResponse.json();

            let result = {
                city: city,
                country: country,
                temp: weatherData.main.temp,
                humidity: weatherData.main.humidity,
                weather: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon,
                windSpeed: weatherData.wind.speed,        // ✅ Wind speed in m/s
            }

            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
          setLoading(true); // 🔵 Show loading

        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
             setError(false);  // ✅ reset error on success
            setCity("");
        } catch (err) {
            setError(true);
        } finally {
        setLoading(false); // 🟢 Hide loading
    }
    }

    return (
        <div className='SearchBox'>
            <form className="formDetails" onSubmit={handleSubmit}>
                <TextField id="city" placeholder='Search for City' variant="standard" value={city} onChange={handleChange} required />
                <Button variant="contained" type="submit" >Search</Button>
            </form>
            {error && (
                <div style={{ marginTop: "8px" }}>
                    <p style={{ color: "red", fontSize: "1.2rem" }}>City not found!</p>
                </div>
            )}

        </div>
    )
}