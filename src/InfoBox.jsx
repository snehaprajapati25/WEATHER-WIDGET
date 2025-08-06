import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

export default function InfoBox({ info }) {

    return (
        <div className='InfoBox'>

            <div className='CardContainer'>
                <Card sx={{
                    maxWidth: '700px',
                    backgroundColor: 'rgba(219, 226, 239, 0.45)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    border: '2px, solid, white',
                    borderRadius: '14px',
                    padding: '16px'
                }}>
                    <CardContent>
                        <Typography
                            gutterBottom variant="h5"
                            component="div"
                            sx={{ fontSize: '2rem', color: 'white' }}
                        >
                            {info.city}, {info.country}
                        </Typography>
                        <Typography sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
                            {info.weather}
                        </Typography>
                        <Typography>
                            <img
                                src={`http://openweathermap.org/img/wn/${info.icon}@2x.png`}
                                alt="Weather Icon"
                            />
                        </Typography>
                        <Typography variant="h5"
                            component="div" sx={{ fontSize: '2.75rem', color: 'white', marginBottom: '20px', marginTop: '15px', fontWeight: '700', fontFamily: 'Merriweather Sans' }}>
                            {info.temp} &deg;C
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: '1rem' }}>
                            <div className='weatherDetail'>
                                <img src='/public/humidity.png'></img>
                                <p>HUMIDITY</p>
                                <p> {info.humidity}%</p>
                            </div>
                            <div className='weatherDetail'>
                                <img src='/public/wind.png'></img>
                                <p>WIND SPEED </p>
                                <p> {info.windSpeed}m/s</p>
                            </div>

                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}