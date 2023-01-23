import React, { useState, useEffect } from 'react';
import Button from './Button';
import './CurrentLocationInfo.css';
import mapMarker from './map-marker-white.webp';

function CurrentLocationInfo() {
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [conditionText, setConditionText] = useState(null);
  const [conditionIcon, setConditionIcon] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [threeAMTemp, setThreeAMTemp] = useState(null);
  const [sixAMTemp, setSixAMTemp] = useState(null);
  const [nineAMTemp, setNineAMTemp] = useState(null);
  const [twelvePMTemp, setTwelvePMTemp] = useState(null);
  const [twoPMTemp, setTwoPMTemp] = useState(null);
  const [fivePMTemp, setFivePMTemp] = useState(null);
  const [eightPMTemp, setEightPMTemp] = useState(null);
  const [elevenPMTemp, setElevenPMTemp] = useState(null);
  const [location, setLocation] = useState({name: null, region:null, country:null});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(`http://api.weatherapi.com/v1/current.json?key=fd3ff7261f4242a7b64202129231901&q=${lat},${lon}&aqi=no`)
            .then(response => response.json())
            .then(data => {
              setTemp(data.current.temp_f);
              setWind(data.current.wind_mph);
              setFeelsLike(data.current.feelslike_f);
              setLastUpdated(new Date(data.current.last_updated).toLocaleString("en-US", { hour: "numeric", hour12: true, minute: "numeric"}));
              setConditionText(data.current.condition.text);
              setConditionIcon(data.current.condition.icon);
              setLocation({name: data.location.name, region: data.location.region, country: data.location.tz_id});
            })
            .catch(error => console.log(error));
        },
        () => {
          console.log("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.log("Error: Your browser does not support geolocation.");
    }
  }, []);

  useEffect(() => {
    if(!location.name) return;
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=fd3ff7261f4242a7b64202129231901&q=${location.name}&days=7&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(data => {
        setThreeAMTemp(data.forecast.forecastday[0].hour[2].temp_f);
        setSixAMTemp(data.forecast.forecastday[0].hour[5].temp_f);
        setNineAMTemp(data.forecast.forecastday[0].hour[8].temp_f);
        setTwelvePMTemp(data.forecast.forecastday[0].hour[11].temp_f);
        setTwoPMTemp(data.forecast.forecastday[0].hour[14].temp_f);
        setFivePMTemp(data.forecast.forecastday[0].hour[17].temp_f);
        setEightPMTemp(data.forecast.forecastday[0].hour[20].temp_f);
        setElevenPMTemp(data.forecast.forecastday[0].hour[23].temp_f);
      })
    });

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://api.weatherapi.com/v1/current.json?key=fd3ff7261f4242a7b64202129231901&q=${e.target.location.value}&aqi=no`)
      .then(response => response.json())
      .then(data => {
        setTemp(data.current.temp_f);
        setWind(data.current.wind_mph);
        setFeelsLike(data.current.feelslike_f);
        setLastUpdated(new Date(data.current.last_updated).toLocaleString("en-US", { hour: "numeric", hour12: true, minute: "numeric"}));
        setConditionText(data.current.condition.text);
        setConditionIcon(data.current.condition.icon);
        setLocation({name: data.location.name, region: data.location.region, country: data.location.tz_id});
      })
      .catch(error => console.log(error));
  }

  if (!temp) {
    return (
        <div className='weather-content'>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" name="location" placeholder="Enter location" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
    );
  }

  return (
    <>
      <div className='weather-content'>
        <div className='top-feed'>
        <div>
            <img src={mapMarker} width='17' height='27' alt='map marker'/>
            <h1> {location.name}</h1>
          </div>
          <div>
            <p>{conditionText}</p><img src={conditionIcon} alt='' />
          </div>
        </div>
        <div className='main-feed'>
          <p>{temp}°</p>
        </div>
        <div className='bottom-feed'>
          <p>Feels like {feelsLike}°</p>
          <p>{wind} <span>mph</span> winds</p>
        </div>
      </div>
      <div className="future-weather">
        <h2>Today's Forecast</h2>
        <div>
          <span>3am</span>
          <span>{threeAMTemp}°</span>
        </div>
        <div>
          <span>6am</span>
          <span>{sixAMTemp}°</span>
        </div>
        <div>
          <span>9am</span>
          <span>{nineAMTemp}°</span>
        </div>
        <div>
          <span>12am</span>
          <span>{twelvePMTemp}°</span>
        </div>
        <div>
          <span>2pm</span>
          <span>{twoPMTemp}°</span>
        </div>
        <div>
          <span>5pm</span>
          <span>{fivePMTemp}°</span>
        </div>
        <div>
          <span>8pm</span>
          <span>{eightPMTemp}°</span>
        </div>
        <div>
          <span>11pm</span>
          <span>{elevenPMTemp}°</span>
        </div>
      </div>
      { /*<div>
        <Button title="Tomorrow's Weather"/>
      </div>
      <footer>
        <div>
          <p>Last Updated: {lastUpdated}</p>
        </div>
  </footer> */}
    </>
  );
}

export default CurrentLocationInfo;