// Footer info
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// WEATHER
const apiKey = "0439a08d23b9b9e8d93e250160163f9d";
const city = "Lagos,NG";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    document.getElementById("current-temp").textContent = `Current Temp: ${data.main.temp} °C`;
    document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;

    const fRes = await fetch(forecastUrl);
    const fData = await fRes.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "<h3>3-Day Forecast</h3>";

    const days = {};
    fData.list.forEach(entry => {
      const date = new Date(entry.dt_txt).toLocaleDateString();
      if (!days[date]) {
        days[date] = entry.main.temp;
      }
    });

    Object.keys(days).slice(0, 3).forEach(date => {
      forecastDiv.innerHTML += `<p>${date}: ${days[date]} °C</p>`;
    });

  } catch (err) {
    console.error("Weather error:", err);
  }
}

// SPOTLIGHTS
async function loadSpotlights() {
  try {
    const res = await fetch("data/members.json");
    const members = await res.json();

    const goldSilver = members.filter(m => m.membership >= 2);
    const randomSelection = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.querySelector(".spotlight-container");
    randomSelection.forEach(member => {
      const div = document.createElement("div");
      div.classList.add("spotlight-card");
      div.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Spotlight error:", err);
  }
}

getWeather();
loadSpotlights();
