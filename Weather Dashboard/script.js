const apiKey = "b2d6e318b3270095a3a9ddc94fa17b1b"; // Replace with your OpenWeatherMap API key

const getWeatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weatherInfo");
const errorElement = document.getElementById("error");

getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        displayError("Please enter a city name.");
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    errorElement.style.display = "none";
    weatherInfo.style.display = "block";
    weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
`;
}

function displayError(message) {
    weatherInfo.style.display = "none";
    errorElement.style.display = "block";
    errorElement.textContent = message;
}