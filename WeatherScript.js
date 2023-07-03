const apiKey = 'ca07232f4c09bc3a0b8d4011d4be17cd'; // Replace with your OpenWeatherMap API key

document.getElementById('searchBtn').addEventListener('click', () => {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim();

  if (cityName.length === 0) {
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {
      const weatherData = response.data;
      displayWeatherInfo(weatherData);
    })
    .catch(error => {
      console.error(error);
      displayErrorMessage();
    });

  cityInput.value = '';
});

function displayWeatherInfo(data) {
  const weatherInfoDiv = document.getElementById('weatherInfo');
  weatherInfoDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

function displayErrorMessage() {
  const weatherInfoDiv = document.getElementById('weatherInfo');
  weatherInfoDiv.innerHTML = '<p class="error">Error retrieving weather data. Please try again.</p>';
}
