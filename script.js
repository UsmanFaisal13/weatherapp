const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "830ddf7248254678998164434240705";
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  const response = await fetch(apiUrl);
  console.log(response);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  } else {
    return await response.json();
  }
}
function displayWeatherInfo(data) {
  const {
    location: { name: city },
    current: {
      temp_c,
      humidity,
      condition: { text },
    },
  } = data;
  console.log(data);
  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  cityDisplay.textContent = city;
  card.appendChild(cityDisplay);
  tempDisplay.textContent = `${temp_c}°C`;
  tempDisplay.classList.add("tempDisplay");
  card.appendChild(tempDisplay);
  humidityDisplay.textContent = `💧humidity: ${humidity}`;
  humidityDisplay.classList.add("humidityDisplay");
  card.appendChild(humidityDisplay);
  descDisplay.textContent = text;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  card.textContent = "";
  card.style.display = "flex";
  errorDisplay.classList.add("errorDisplay");
  card.appendChild(errorDisplay);
  console.log(message);
}
