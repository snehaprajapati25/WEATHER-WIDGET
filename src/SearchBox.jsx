import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = "http://api.openweathermap.org/geo/1.0/direct";
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

        try {
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
            <form className="formDetails" onSubmit={handleSubmit}>
                <TextField id="city" placeholder='Search for City' variant="standard" value={city} onChange={handleChange} required />
                <Button variant="contained" type="submit" >Search</Button>
                {error && <p style={{ color: "red" }}>City not found!</p>}
                 
            </form>
           
        </div>
    )
}