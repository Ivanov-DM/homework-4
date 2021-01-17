import { saveList, readList, drawList } from "./storage";

const OPEN_WEATHER_MAP_API_KEY = "325a22275c1255e94a9b1ee8ae86259a";

export function getCurrentCityTitle() {
  return fetch("https://get.geojs.io/v1/ip/geo.json")
    .then((response) => response.json())
    .then((data) => data.city);
}

export function getWeatherData(cityName) {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
  return fetch(API_URL).then((response) => response.json());
}

export function getCityMapImgAddress(cityName) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${cityName}&zoom=13&size=400x400&key=AIzaSyCn9o27r_AnjgLXWymUmKW7b5C3y62OAG8`;
}

export function drawWeather(data, el) {
  const weatherBlock = el.querySelector("#weatherBlock");
  if (weatherBlock.childNodes.length !== 0) {
    weatherBlock.innerHTML = "";
  }
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
  const temperature = Math.round(data.main.temp);
  currentTemp.innerText =
    temperature > 0 ? `+${temperature}° С` : `${temperature}° С`;
  weatherDescription.innerText = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherBlock.appendChild(cityTitle);
  weatherBlock.appendChild(currentTemp);
  weatherBlock.appendChild(weatherIcon);
  weatherBlock.appendChild(weatherDescription);
}

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
  const cityList = readList();
  drawList(historyList, cityList);

  const cityMap = document.createElement("img");
  cityMap.id = "cityMap";

  inputForm.appendChild(inputField);
  inputForm.appendChild(btn);

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const inputCity = inputField.value;
    if (inputCity === "") {
      alert("Enter some city");
    } else {
      inputField.value = "";
      getWeatherData(inputCity).then((data) => {
        drawWeather(data, el);
        const cityName = data.name;
        if (cityList.indexOf(cityName) === -1) {
          cityList.unshift(cityName);
          drawList(historyList, cityList);
          saveList(cityName);
        }
        cityMap.src = getCityMapImgAddress(cityName);
      });
    }
  });

  historyList.addEventListener("click", (event) => {
    const checkedCityName = event.target.innerText;
    getWeatherData(checkedCityName).then((data) => {
      drawWeather(data, el);
      document.querySelector("#cityMap").src = getCityMapImgAddress(data.name);
    });
  });

  el.appendChild(inputForm);
  el.appendChild(weatherBlock);
  el.appendChild(cityMap);
  el.appendChild(historyListHeader);
  el.appendChild(historyList);
}
