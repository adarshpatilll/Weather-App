const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const city_name = document.querySelector("#city-name");
const pressure = document.querySelector("#pressure");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  if (city === "") {
    document.querySelector("#error-title").innerHTML = "Location field is required!!!";
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }

  const api_key = "bad250978ccbf50f8741c5a9ae577e6e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    document.querySelector("#error-title").innerHTML = "Sorry, Location not found!!!";
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  console.log("run");

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;
  city_name.innerHTML = `${weather_data.name}`;
  pressure.innerHTML = `${weather_data.main.pressure} hPa`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/assets/cloudy.gif";
      break;
    case "Clear":
      weather_img.src = "/assets/sun.gif";
      break;
    case "Rain":
      weather_img.src = "/assets/rain.gif";
      break;
    case "Mist":
      weather_img.src = "/assets/wind.gif";
      break;
    case "Snow":
      weather_img.src = "/assets/snow.gif";
      break;
    case "Thunderstorm":
      weather_img.src = "/assets/storm.gif";
      break;
  }

  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(inputBox.value);
  }
});

document.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("selectstart", (e) => e.preventDefault());
document.addEventListener("contextmenu", (e) => e.preventDefault());
