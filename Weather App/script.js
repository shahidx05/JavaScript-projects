const btn = document.querySelector("#Btn");
const input = document.querySelector("#input");
const info = document.querySelector("#Info");


btn.addEventListener("click", () => {
    const city = input.value.trim();

    if (!city) {
        info.innerHTML = `<p class="error">⚠️ Please enter a city name!</p>`;
        setTimeout(() => {
            info.textContent = "";
        }, 2000)
        return;
    }

    input.value = "";

    info.textContent = "⏳ Loading...";
    btn.disabled = true;

    const api = `https://api.weatherapi.com/v1/current.json?key=cff6871876d5426a859105925253007&q=${city}&aqi=no`;

    fetch(api)
        .then((response) => {
            if (!response.ok) throw new Error("City not found!");
            return response.json();
        })
        .then(data => {
            const name = data.location.name;
            const country = data.location.country;
            const temp = data.current.temp_c;
            const desc = data.current.condition.text;
            const icon = data.current.condition.icon;
            const humidity = data.current.humidity;
            const wind = data.current.wind_kph;
            const time = data.location.localtime;

            info.innerHTML = `
          <div class="weather-card">
        <h2>📍 ${name}, ${country}</h2>
        <p>🕒 Local Time: ${time}</p>
        <img src="https:${icon}" alt="${desc}" />
        <p><strong>${temp}°C</strong> – ${desc}</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind: ${wind} kph</p>
         </div>
      `;
        })
        .catch((err) => {
            info.innerHTML = `<p class="error">❌ ${err.message}</p>`
            setTimeout(() => {
                info.textContent = "";
            }, 2000)
        })
        .finally(() => {
            btn.disabled = false;
        });
})