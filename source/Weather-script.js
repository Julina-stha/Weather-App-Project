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




function displayWeatherInfo(outcome) {
  console.log(outcome);
  document.querySelector("#city-name").innerHTML = outcome.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(outcome.data.main.temp)}`;
  document.querySelector("#weather-description").innerHTML = outcome.data.weather[0].description;

}

function searchCity(results) {
  let apiKey = "ba753d969dccd2973e89444d00d45191";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${results}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
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
  let switchF = document.querySelector("#temperature").value;
  if (event.target.checked) {
    switchF.innerHTML = `${Math.round((switchF * 9) / 5 + 32)}°F`;
  } else {
    switchF.innerHTML = switchF;
  }
}
let switchButton = document.querySelector("#flexSwitchCheckDefault");
switchButton.addEventListener("click", showFarenheit);



    