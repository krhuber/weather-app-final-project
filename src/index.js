//function to show current day of the week
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} - `;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img 
        src="icons/01d.png" alt="" width = 40px
      />
      <div class="weather-forecast-temperature">
        <span class="weather-temperature-max">
          90° 
        </span>
          |
        <span class="weather-temperature-min">
          80°
        </span>
      </div>
    </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//function to show timestap next to current day of the week
function formatTimestamp(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return ` ${hours}:${minutes} ${AmOrPm}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "84101301d1e855bff406380c1296fbbf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
// Main function for showing current conditions
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let timestampElement = document.querySelector("#timestamp");
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinElement = document.querySelector("#temp-min");
  let iconElement = document.querySelector("#icon");
  let iconElementApi = response.data.weather[0].icon;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max);
  tempMinElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timestampElement.innerHTML = formatTimestamp(response.data.dt * 1000);
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  iconElement.setAttribute("src", `icons/${iconElementApi}.png`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "84101301d1e855bff406380c1296fbbf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
