import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [temperature, setTemperature] = useState(null);
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    axios
      .get(url)
      .then((response) => {
        setTemperature(response.data.main.temp);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setTemperature(null);
      });
  }

  function handleInputChange(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {temperature !== null && !error && (
        <p>
          The weather in {city} is:
          <ul>
            <li> Temperature: {Math.round(temperature)}°C </li>
          </ul>
        </p>
      )}
      {error && <p>Error: Unable to fetch the temperature for {city}</p>}
    </div>
  );
}
