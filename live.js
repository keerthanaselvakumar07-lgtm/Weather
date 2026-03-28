 function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeatherByLocation);
    } else {
        alert("Geolocation not supported ❌");
    }
    }
async function showWeatherByLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "f7bf4524ab45d41704b2a41ff167f3ba";

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let temp = data.main.temp;
        let weather = data.weather[0].description;
        let humidity = data.main.humidity;
        let city = data.name;
        let iconCode = data.weather[0].icon;

        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        let result = document.getElementById("result");

        result.innerHTML =
             `🌍 ${city} <br>
             🌡️ Temperature: ${temp}°C <br>
             ☁️ Condition: ${weather} <br>
             💧 Humidity: ${humidity}% <br>
             <img src="${iconUrl}">`;
             
        result.style.opacity = 0;
        setTimeout(() => {
            result.style.opacity = 1;
        }, 100);

        let condition = data.weather[0].main.toLowerCase();

        if (condition.includes("clear")) {
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
        }
        else if (condition.includes("cloud")) {
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        }
        else if (condition.includes("rain")) {
        document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
        }
        else if (condition.includes("thunderstorm")) {
        document.body.style.background = "linear-gradient(to right, #141e30, #243b55)";
        }
        else {
        document.body.style.background = "lightblue";
        }

    } catch (error) {
        alert("Error getting location weather ⚠️");
    }
}