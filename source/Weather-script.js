///Setting the Time and Date///

let current = new Date();
let currentDate = current.getDate();
if (currentDate < 10) {
  currentDate = `0${currentDate}`;
}
let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let currentMonth = months[current.getMonth()];
let currentYear = current.getFullYear();
let displayDate = document.querySelector("#date");
displayDate.innerHTML = `${currentDate}/${currentMonth}/${currentYear}`;

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let currentDay = days[current.getDay()];
let displayDay = document.querySelector("#day");
displayDay.innerHTML = currentDay;

let currentHour = current.getHours();

let currentMin = current.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let displayTime = document.querySelector("#time");
displayTime.innerHTML = `${currentHour}:${currentMin}`;


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


function displayWeatherInfo(outcome) {
  document.querySelector("#city-name").innerHTML = outcome.data.name;
  celsiusTemp = outcome.data.main.temp;
  document.querySelector("#temperature").innerHTML = `${Math.round(celsiusTemp)}`;
  document.querySelector("#weather-description").innerHTML = outcome.data.weather[0].description;
  
}

function displayHourlyForecast(response) {
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  hourlyForecastElement.innerHTML = null;
  let hourlyForecast = null;
  
  for (let index = 0; index < 4; index++) {
    let hourlyForecast = response.data.list[index];
    hourlyForecastElement.innerHTML += `
    <div class="list-group-item-2 list-group-item-action">
      ${formatHours(hourlyForecast.dt * 1000)}
      <span class="second-section-icon">
      <img src="https://img.icons8.com/doodle/96/000000/bright-moon.png" width="42" />
        <span class="third-section-degree">
          ${Math.round(hourlyForecast.main.temp)}°
        </span>
      </span>
    </div>`
  }
}

function formatIcon(icon) {
  let iconElement = null;
  if (icon === "")
}

function searchCity(results) {
  let apiKey = "ba753d969dccd2973e89444d00d45191";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${results}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${results}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast);
}
searchCity("Kathmandu");

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

let searchButton = document.querySelector("#on-click");
searchButton.addEventListener("click", submit);



function showLocation(position) {
  let apiKey = "ba753d969dccd2973e89444d00d45191";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}
function defaultAction(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locateButton = document.querySelector("#locate");
locateButton.addEventListener("click", defaultAction);

function showFarenheit(event) {
  let switchF = document.querySelector("#temperature");
  let farenheitFormula = (celsiusTemp * 9) / 5 + 32;
  if (event.target.checked) {
    switchF.innerHTML = `${Math.round(farenheitFormula)}°F`;
  } else {
    switchF.innerHTML = `${Math.round(celsiusTemp)}°C`;
  }
}

function showFarenheitAll(event) {
  let switchF = document.querySelector("#temperature");
  let farenheitFormula = (celsiusTemp * 9) / 5 + 32;
  if (event.target.checked) {
    switchF.innerHTML = `${Math.round(farenheitFormula)}°F`;
  } else {
    switchF.innerHTML = `${Math.round(celsiusTemp)}°C`;
  }
}

function hideCelsius() {
  let celsius = document.querySelector("#unit");
  celsius.innerHTML = "";
}

let celsiusTemp = null;

let switchButton = document.querySelector("#flexSwitchCheckDefault");
switchButton.addEventListener("click", showFarenheit);
switchButton.addEventListener("click", hideCelsius);



    