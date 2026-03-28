    async function getWeather() 
    {
    let city = document.getElementById("city").value;
    let apiKey = "f7bf4524ab45d41704b2a41ff167f3ba";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === "404") {
            document.getElementById("result").innerHTML = "City not found ❌";
            return;
        }

        let temp = data.main.temp;
        let weather = data.weather[0].description;
        let humidity = data.main.humidity;
        let iconCode = data.weather[0].icon;
        
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("result").innerHTML =
            `🌍 ${city} <br>
             🌡️ Temperature: ${temp}°C <br>
             ☁️ Condition: ${weather} <br>
             💧 Humidity: ${humidity}% <br>
             <img src="${iconUrl}">`;

        let result = document.getElementById("result");

        result.style.opacity = 0;   
        setTimeout(() => {
        result.style.opacity = 1;  
        }, 99);

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

        
    } 
    catch (error) 
    {
        document.getElementById("result").innerHTML = "Error fetching data ⚠️";
    }
    }
   