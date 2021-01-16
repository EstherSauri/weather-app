let currentTime = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
let dayTime = document.querySelector("#dayTime");
dayTime.innerHTML = `${currentDay} | ${currentHour}:${currentMinutes}`;

function showTemperature (response) {

  celsius = Math.round(response.data.main.temp)
  document.querySelector("#temperature").innerHTML = celsius;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#realFeel").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#maximum").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#minimum").innerHTML = Math.round(response.data.main.temp_min);
}

function searchCity(city) {
  let apiKey = "74c313891ab91d11cf96230279a062ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchField").value;
  searchCity(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function changeFahrenheit(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = Math.round((celsius * 9) / 5 + 32);
temperatureElement.innerHTML = `${fahrenheitTemperature}`;
}

function changeCelsius(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = celsius;
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}

function showPosition(position) {
  let apiKey = "74c313891ab91d11cf96230279a062ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(showPosition);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeFahrenheit); 

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeCelsius); 

let celsius = null;

searchCity("Valencia");

let currentButton = document.querySelector("#location-button"); 
currentButton.addEventListener("click", getLocation);


