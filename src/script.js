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
  let weatherIcons = {
    "01d": "images/sun.png",
    "01n": "images/moon.svg",
    "02d": "images/fewclouds.svg",
    "02n": "images/fewcloudsnight.svg",
    "03d": "images/clouds.svg",
    "03n": "images/clouds.svg",
    "04d": "images/darkclouds.svg",
    "04n": "images/darkclouds.svg",
    "09d": "images/rain.svg",
    "09n": "images/rain.svg",
    "10d": "images/rainday.svg",
    "10n": "images/rainnight.svg",
    "11d": "images/storm.svg",
    "11n": "images/storm.svg",
    "13d": "images/snowday.svg",
    "13n": "images/snownight.svg",
    "50d": "images/fog.svg",
    "50n": "images/fog.svg",
  };

  celsius = Math.round(response.data.main.temp)
  document.querySelector("#temperature").innerHTML = celsius;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#realFeel").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#maximum").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#minimum").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#weatherIcon").setAttribute("src", weatherIcons[response.data.weather[0].icon]);
  document.querySelector("#weatherIcon").setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    let weatherIcons = {
    "01d": "images/sun.png",
    "01n": "images/moon.svg",
    "02d": "images/fewclouds.svg",
    "02n": "images/fewcloudsnight.svg",
    "03d": "images/clouds.svg",
    "03n": "images/clouds.svg",
    "04d": "images/darkclouds.svg",
    "04n": "images/darkclouds.svg",
    "09d": "images/rain.svg",
    "09n": "images/rain.svg",
    "10d": "images/rainday.svg",
    "10n": "images/rainnight.svg",
    "11d": "images/storm.svg",
    "11n": "images/storm.svg",
    "13d": "images/snowday.svg",
    "13n": "images/snownight.svg",
    "50d": "images/fog.svg",
    "50n": "images/fog.svg",
  };
    forecastElement.innerHTML += `
    <div class="col-sm">
                <div class="card">
                    <div class="card-body week">
                        <strong>${formatHours(forecast.dt * 1000)}</strong>
                        <br />
                        <img src="${weatherIcons[forecast.weather[0].icon]}" alt="sunIcon">
                        <br />
                        <strong>
                        ${Math.round(forecast.main.temp)}°C
                    </div>
                </div>
                `;}
  }

function searchCity(city) {
  let apiKey = "74c313891ab91d11cf96230279a062ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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


