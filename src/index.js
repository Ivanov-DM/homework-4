import {
  createForm,
  getCurrentCityTitle,
  getWeatherData,
  drawWeather,
} from "./app";

const container = document.querySelector("#container");

createForm(container);
getCurrentCityTitle().then((cityName) =>
  getWeatherData(cityName).then((data) => drawWeather(data, container))
);
