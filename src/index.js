const OPEN_WEATHER_MAP_API_KEY = "325a22275c1255e94a9b1ee8ae86259a";

export function createForm(el) {
  const inputForm = document.createElement("form");

  const inputField = document.createElement("input");
  inputField.id = "userInput";
  inputField.placeholder = "Type city and press enter!";
  inputField.required = true;
  inputField.autofocus = true;

  const btn = document.createElement("button");
  btn.innerText = "Get weather";

  const weatherBlock = document.createElement("div");
  weatherBlock.id = "weatherBlock";

  const historyList = document.createElement("div");
  historyList.id = "historyList";

  const historyListHeader = document.createElement("h2");
  historyListHeader.innerText = "You have watched the weather in:";

  const cityMap = document.createElement("img");
  cityMap.id = "cityMap";

  inputForm.appendChild(inputField);
  inputForm.appendChild(btn);

  el.appendChild(inputForm);
  el.appendChild(weatherBlock);
  el.appendChild(cityMap);
  el.appendChild(historyListHeader);
  el.appendChild(historyList);
}

export function getCurrentCityTitle() {
  return fetch("https://get.geojs.io/v1/ip/geo.json")
    .then((response) => response.json())
    .then((data) => data.city);
}

export function getWeatherData(cityName, API_KEY) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;
  return fetch(API_URL).then((response) => response.json());
}

export function drawWeather(data) {
  const weatherBloc = document.getElementById("weatherBlock");
  if (data) {
    const cityTitle = document.createElement("h2");
    const currentTemp = document.createElement("p");
    const weatherDescription = document.createElement("p");
    const weatherIcon = document.createElement("img");
    cityTitle.innerText = data.name;
    const temperature = data.main.temp;
    currentTemp.innerText =
      temperature > 0 ? `+${temperature}° С` : `${temperature}° С`;
    weatherDescription.innerText = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    if (weatherBloc.childNodes.length === 0) {
      weatherBloc.appendChild(cityTitle);
      weatherBloc.appendChild(currentTemp);
      weatherBloc.appendChild(weatherIcon);
      weatherBloc.appendChild(weatherDescription);
    } else {
      weatherBloc.innerHTML = "";
      weatherBloc.appendChild(cityTitle);
      weatherBloc.appendChild(currentTemp);
      weatherBloc.appendChild(weatherIcon);
      weatherBloc.appendChild(weatherDescription);
    }
  } else {
    weatherBloc.innerHTML = "This city is not exists";
  }
}

const container = document.querySelector("#container");
createForm(container);
getCurrentCityTitle().then((cityName) => {
  getWeatherData(cityName, OPEN_WEATHER_MAP_API_KEY).then((data) => {
    drawWeather(data);
  });
});
