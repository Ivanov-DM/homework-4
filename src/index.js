import {
  createForm,
  getCurrentCityTitle,
  getWeatherData,
  drawWeather,
} from "./app";

const OPEN_WEATHER_MAP_API_KEY = "325a22275c1255e94a9b1ee8ae86259a";
const container = document.querySelector("#container");

createForm(container);
const weatherBlock = document.querySelector("#weatherBlock");
getCurrentCityTitle().then((cityName) =>
  getWeatherData(cityName, OPEN_WEATHER_MAP_API_KEY).then((data) =>
    drawWeather(data, weatherBlock)
  )
);
