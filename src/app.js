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

export function getCityMapImgAddress(cityName) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${cityName}&zoom=13&size=400x400&key=AIzaSyCn9o27r_AnjgLXWymUmKW7b5C3y62OAG8`;
}

export function drawWeather(data, el) {
  const weatherBlock = el.querySelector("#weatherBlock");
  const cityMap = el.querySelector("#cityMap");
  const cityTitle = document.createElement("h2");
  cityTitle.id = "cityTitle";
  const currentTemp = document.createElement("p");
  currentTemp.id = "currentTemp";
  const weatherDescription = document.createElement("p");
  weatherDescription.id = "weatherDescription";
  const weatherIcon = document.createElement("img");
  weatherIcon.id = "weatherIcon";
  const cityName = data.name;
  cityTitle.innerText = cityName;
  cityMap.src = getCityMapImgAddress(cityName);
  const temperature = data.main.temp;
  currentTemp.innerText =
    temperature > 0 ? `+${temperature}° С` : `${temperature}° С`;
  weatherDescription.innerText = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherBlock.appendChild(cityTitle);
  weatherBlock.appendChild(currentTemp);
  weatherBlock.appendChild(weatherIcon);
  weatherBlock.appendChild(weatherDescription);
}
