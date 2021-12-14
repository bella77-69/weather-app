import React, { useState } from "react";
import "./App.css";
import { api_key, api_base } from "./apis/config";


export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (event) => {
    
    if (event.key === "Enter") {
      fetch(`${api_base}weather?q=${query}&appid=${api_key}`)
    
        // .then((response) => response.json())
        .then((response) => {
          let resp = JSON.stringify(response)
          setWeather(response);
          setQuery("");
          console.log(response);
          response = JSON.parse(resp)
         
        })
        .catch((error) => {
          console.log(error)
        })
    }};
  

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App .warm"
            : ".App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
