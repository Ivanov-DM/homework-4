import {
  createForm,
  drawWeather,
  getCurrentCityTitle,
  getWeatherData,
} from "./app";

describe("Tests for index.js", () => {
  let el;
  const testData = {
    main: {
      temp: 1.83,
    },
    name: "Elista",
    weather: [
      {
        description: "overcast clouds",
        icon: "04n",
      },
    ],
  };

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    el = document.createElement("div");
    el.id = "container";
    fetch.mockClear();
  });

  it("is a function", () => {
    expect(typeof createForm).toBe("function");
  });

  it("creates form", () => {
    createForm(el);
    const form = el.querySelector("form");
    const input = el.querySelector("#userInput");
    const button = el.querySelector("button");
    const weatherBlock = el.querySelector("#weatherBlock");
    const historyList = el.querySelector("#historyList");
    const historyListHeader = el.querySelector("h2");
    const cityMap = el.querySelector("#cityMap");

    expect(form).not.toBeNull();
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe("Type city and press enter!");
    expect(input.required).toBeTruthy();
    expect(input.autofocus).toBeTruthy();
    expect(button).not.toBeNull();
    expect(button.innerText).toBe("Get weather");
    expect(weatherBlock).not.toBeNull();
    expect(historyList).not.toBeNull();
    expect(historyListHeader.innerText).toBe(
      "You have watched the weather in:"
    );
    expect(cityMap).not.toBeNull();
  });

  // it("get city title for current user location", () => {
  //   fetch.mockResolvedValue("Moscow");
  //   const expected = "Moscow";
  //   getCurrentCityTitle().then((data) => {
  //     expect(typeof data).toBe("string");
  //     expect(data).toBe(expected);
  //     expect(fetch).toHaveBeenCalledTimes(1);
  //     expect(fetch).toHaveBeenCalledWith("https://get.geojs.io/v1/ip/geo.json");
  //   });
  // });

  it("get city title for current user location", () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ city: "Moscow" }),
      })
    );
    return getCurrentCityTitle().then((data) => {
      expect(typeof data).toBe("string");
      expect(data).toBe("Moscow");
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://get.geojs.io/v1/ip/geo.json");
    });
  });

  it("get dataWeather for some city", () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
    return getWeatherData().then((data) => {
      expect(data.main.temp).toBe(1.83);
      expect(data.name).toEqual("Elista");
      expect(data.weather[0].description).toEqual("overcast clouds");
      expect(data.weather[0].icon).toEqual("04n");
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it("draw weather forecast for some city", () => {
    createForm(el);
    const weatherBlock = el.querySelector("#weatherBlock");
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
    return getWeatherData().then((data) => {
      drawWeather(data, weatherBlock);
      const cityTitle = el.querySelector("#cityTitle");
      const currentTemp = el.querySelector("#currentTemp");
      const description = el.querySelector("#weatherDescription");
      const weatherIcon = el.querySelector("#weatherIcon");
      expect(cityTitle).not.toBeNull();
      expect(cityTitle.innerText).toEqual("Elista");
      expect(currentTemp).not.toBeNull();
      expect(currentTemp.innerText).toEqual("+1.83° С");
      expect(description).not.toBeNull();
      expect(description.innerText).toEqual("overcast clouds");
      expect(weatherIcon).not.toBeNull();
      expect(weatherIcon.src).toEqual(
        "http://openweathermap.org/img/wn/04n@2x.png"
      );
    });
  });
});
