///Setting the Time and Date///
let current = new Date();
let currentDate = current.getDate();
if (currentDate < 10) {
  currentDate = `0${currentDate}`;
}
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let currentMonth = months[current.getMonth()];
let currentYear = current.getFullYear();
let displayDate = document.querySelector("#date");
displayDate.innerHTML = `${currentDate}/${currentMonth}/${currentYear}`;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[current.getDay()];
let displayDay = document.querySelector("#day");
displayDay.innerHTML = currentDay;
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
function formatWeekDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let dailyWeekDays = days[date.getDay()];
  return `${dailyWeekDays}`;
}
function formatLocalTime(timeZone, dateTime) {
  let now = new Date();
  if (dateTime !== null) {
    now = new Date(dateTime * 1000);
  }
  let timeZoneOffsetInMs = now.getTimezoneOffset() * 60 * 1000;
  let timeZoneInMs = timeZone * 1000;
  let convertedTime = now.getTime() + timeZoneOffsetInMs + timeZoneInMs;
  return convertedTime;
}
function formatIcon(icon) {
  let iconElement = null;
  if (icon === "01d") {
    iconElement = "source/images/Icons/01d.png";
  } else if (icon === "02d") {
    iconElement = "source/images/Icons/02d.png";
  } else if (icon === "03d") {
    iconElement = "source/images/Icons/03d.png";
  } else if (icon === "04d") {
    iconElement = "source/images/Icons/04d.png";
  } else if (icon === "09d") {
    iconElement = "source/images/Icons/09d.png";
  } else if (icon === "10d") {
    iconElement = "source/images/Icons/10d.png";
  } else if (icon === "11d") {
    iconElement = "source/images/Icons/11d.png";
  } else if (icon === "13d") {
    iconElement = "source/images/Icons/13d.png";
  } else if (icon === "01n") {
    iconElement = "source/images/Icons/01n.png";
  } else if (icon === "02n") {
    iconElement = "source/images/Icons/02n.png";
  } else if (icon === "03n") {
    iconElement = "source/images/Icons/03n.png";
  } else if (icon === "04n") {
    iconElement = "source/images/Icons/04n.png";
  } else if (icon === "09n") {
    iconElement = "source/images/Icons/09n.png";
  } else if (icon === "10n") {
    iconElement = "source/images/Icons/10n.png";
  } else if (icon === "11n") {
    iconElement = "source/images/Icons/11n.png";
  } else if (icon === "13n") {
    iconElement = "source/images/Icons/13n.png";
  } else if (icon === "50n") {
    iconElement = "source/images/Icons/50n.png";
  } else if (icon === "50d") {
    iconElement = "source/images/Icons/50d.png";
  }
  return iconElement;
}
function displayWeatherInfo(outcome) {
  console.log(outcome);
  document.querySelector("#city-name").innerHTML = outcome.data.name;
  celsiusTemp = outcome.data.main.temp;
  document.querySelector("#temperature").innerHTML = `${Math.round(celsiusTemp)}`;
  document.querySelector("#weather-description").innerHTML = outcome.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `Humidity: ${outcome.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(outcome.data.wind.speed)}km/h`;
  document.querySelector("#current-weather-icon").setAttribute("src", formatIcon(outcome.data.weather[0].icon));
  let cityLatitude = outcome.data.coord.lat;
  let cityLongitude = outcome.data.coord.lon;
  getDailyForecast(cityLatitude, cityLongitude);

  let localTimeStamp = formatLocalTime(outcome.data.timezone, null);
  let timeAtLocation = formatHours(localTimeStamp);
  locationDateTimeStamp = localTimeStamp;
  document.querySelector("#local-time").innerHTML = timeAtLocation;
}

//display hourly forecast start//
function displayHourlyForecast(response) {
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  console.log(response.data);
  hourlyForecastElement.innerHTML = null;
  let hourlyForecast = null;
  for (let index = 0; index < 4; index++) {
    let hourlyForecast = response.data.list[index];
    let localTimestamp = hourlyForecast.dt + response.data.city.timezone;
    hourlyForecastElement.innerHTML += `
    <div class="list-group-item-2 list-group-item-action">
      ${formatHours(localTimestamp * 1000)}
      <span class="second-section-icon">
      <img src="${formatIcon(hourlyForecast.weather[0].icon)}" width="48"/>
        <span class="third-section-degree">
          ${Math.round(hourlyForecast.main.temp)}
        </span>°
      </span>
    </div>`;
  }
}
//display hourly forecast end//
//Daily forecast start//
function getDailyForecast(cityLatitude, cityLongitude) {
  let apiKey = "ba753d969dccd2973e89444d00d45191";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayDailyForecast);
}
function displayDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  console.log(response.data);
  dailyForecastElement.innerHTML = null;
  let dailyForecast = null;
  for (let index = 0; index < 4; index++) {
    let dailyForecast = response.data.daily[index];
    dailyForecastElement.innerHTML += `
    <div class="list-group-item list-group-item-action">
      "${formatWeekDay(dailyForecast.dt * 1000)}"
      <span class="second-section-icon">
      <img src="${formatIcon(dailyForecast.weather[0].icon)}" width="60" />
      <div class="second-section-degree">
        ${Math.round(dailyForecast.temp.day)}°
      </div>°
      </span>
    </div>`;
  }
}
//Daily forecast end//

//search box start//
function searchCity(results) {
  let apiKey = "ba753d969dccd2973e89444d00d45191";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${results}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
  let apiHourlyForecastUrlstring = `https://api.openweathermap.org/data/2.5/forecast?q=${results}&appid=${apiKey}&units=metric`;
  axios.get(apiHourlyForecastUrlstring).then(displayHourlyForecast);
}
searchCity("Kathmandu");
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);
let searchButton = document.querySelector("#on-click");
searchButton.addEventListener("click", handleSubmit);
//search box end//

//Locate button start//
function showLocation(position) {
  let apiKey = "ba753d969dccd2973e89444d00d45191";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);

  let apiHourlyForecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiHourlyForecastUrl).then(displayHourlyForecast);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let locateButton = document.querySelector("#locate");
locateButton.addEventListener("click", getLocation);
// Locate button end//

//show fahrenheit start//
function showFahrenheit(event) {
  let switchF = document.querySelector("#temperature");
  let fahrenheitFormula = (celsiusTemp * 9) / 5 + 32;
  if (event.target.checked) {
    switchF.innerHTML = `${Math.round(fahrenheitFormula)}°F`;
    let dailyForecast = document.querySelectorAll(".second-section-degree");
    dailyForecast.forEach(function (item) {
      // grabbing the current value to convert
      let currentTemp = item.innerHTML;
      // convert to Fahrenheit
      item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
    });
    let hourlyForecast = document.querySelectorAll(".third-section-degree");
    hourlyForecast.forEach(function (item) {
      // grabbing the current value to convert
      let currentTemp = item.innerHTML;
      // convert to Fahrenheit
      item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
    });
  } else {
    switchF.innerHTML = `${Math.round(celsiusTemp)}°C`;
    let dailyForecast = document.querySelectorAll(".second-section-degree");
    dailyForecast.forEach(function (item) {
      // grabbing the current value to convert
      let currentTemp = item.innerHTML;
      // convert to Celsius
      item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
    });
    let hourlyForecast = document.querySelectorAll(".third-section-degree");
    hourlyForecast.forEach(function (item) {
      // grabbing the current value to convert
      let currentTemp = item.innerHTML;
      // convert to Celsius
      item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
    });
  }
}
function hideCelsius() {
  let celsius = document.querySelector("#unit");
  celsius.innerHTML = "";
}
let celsiusTemp = null;
let switchButton = document.querySelector("#flexSwitchCheckDefault");
switchButton.addEventListener("click", showFahrenheit);
switchButton.addEventListener("click", hideCelsius);
//show fahrenheit end//