import SearchBox from './SearchBox';
import InfoBox from "./InfoBox";
import { useState } from 'react';
import "./WeatherApp.css";
import Button from '@mui/material/Button';

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({});
    

    const [hasLocationData, setHasLocationData] = useState(false); // to track if location fetched

    let updateInfo = (weatherResult) => {
        setWeatherInfo(weatherResult);
        setHasLocationData(true); // show InfoBox and search after location
    }

    const getWeatherByLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
                    const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

                    try {
                        const res = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
                        const data = await res.json();

                        const result = {
                            city: data.name,
                            country: data.sys.country,
                            temp: data.main.temp,
                            humidity: data.main.humidity,
                            weather: data.weather[0].description,
                            icon: data.weather[0].icon,
                            windSpeed: data.wind.speed,
                        };

                        updateInfo(result);
                    } catch (error) {
                        console.error("Weather fetch error:", error);
                        alert("Failed to fetch weather data.");
                    }
                },
                (error) => {
                    console.error("Location access denied:", error);
                    alert("Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };


    return (
        <div>
            <h1>Weather Widget</h1>
            {!hasLocationData && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <img src="/location.png" alt="location icon" style={{ width: "80px" }} />
                    <br />
                    <Button variant="contained" onClick={getWeatherByLocation}>
                        Your Weather
                    </Button>
                </div>
            )}

            {hasLocationData && (
                <>
                    <SearchBox updateInfo={updateInfo} />
                    <InfoBox info={weatherInfo} />
                </>
            )}



        </div>
    )
}