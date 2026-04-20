// ===== API KEY =====
const API_KEY = "e822737a1c52cccad157b55683776c7b";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// ===== ELEMENTLAR =====
const cityInput   = document.getElementById("city-input");
const searchBtn   = document.getElementById("search-btn");
const weatherCard = document.getElementById("weather-card");
const errorDiv    = document.getElementById("error");
const loadingDiv  = document.getElementById("loading");

const cityNameEl  = document.getElementById("city-name");
const countryEl   = document.getElementById("country");
const iconEl      = document.getElementById("weather-icon");
const tempEl      = document.getElementById("temperature");
const descEl      = document.getElementById("description");
const humidityEl  = document.getElementById("humidity");
const windEl      = document.getElementById("wind");
const visibilityEl= document.getElementById("visibility");
const feelsLikeEl = document.getElementById("feels-like");

// ===== OB-HAVO IKONKASI =====
function getWeatherIcon(code) {
  if (code >= 200 && code < 300) return "⛈️";
  if (code >= 300 && code < 400) return "🌦️";
  if (code >= 500 && code < 600) return "🌧️";
  if (code >= 600 && code < 700) return "❄️";
  if (code >= 700 && code < 800) return "🌫️";
  if (code === 800)               return "☀️";
  if (code === 801)               return "🌤️";
  if (code === 802)               return "⛅";
  if (code >= 803)               return "☁️";
  return "🌈";
}

// ===== SHOW / HIDE =====
function showLoading() {
  loadingDiv.classList.add("show");
  weatherCard.classList.remove("show");
  errorDiv.classList.remove("show");
}

function hideLoading() {
  loadingDiv.classList.remove("show");
}

function showError() {
  errorDiv.classList.add("show");
  weatherCard.classList.remove("show");
}

function showWeather(data) {
  cityNameEl.textContent   = data.name;
  countryEl.textContent    = data.sys.country;
  iconEl.textContent       = getWeatherIcon(data.weather[0].id);
  tempEl.textContent       = Math.round(data.main.temp) + "°C";
  descEl.textContent       = data.weather[0].description;
  humidityEl.textContent   = data.main.humidity + "%";
  windEl.textContent       = Math.round(data.wind.speed) + " m/s";
  visibilityEl.textContent = (data.visibility / 1000).toFixed(1) + " km";
  feelsLikeEl.textContent  = Math.round(data.main.feels_like) + "°C";

  weatherCard.classList.add("show");
}

// ===== API CHAQIRUV =====
async function fetchWeather(city) {
  if (!city.trim()) return;

  showLoading();

  try {
    const url      = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=uz`;
    const response = await fetch(url);

    if (!response.ok) {
      hideLoading();
      showError();
      return;
    }

    const data = await response.json();
    hideLoading();
    showWeather(data);

  } catch (err) {
    hideLoading();
    showError();
  }
}

// ===== EVENT LISTENERS =====
searchBtn.addEventListener("click", function () {
  fetchWeather(cityInput.value);
});

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    fetchWeather(cityInput.value);
  }
});

// ===== BOSHLANG'ICH SHAHAR =====
fetchWeather("Tashkent");
