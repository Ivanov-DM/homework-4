import { createForm, getCurrentCityTitle, getWeatherData } from "./app";

describe("Tests for index.js", () => {
  let el;

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

  it("get city title for current user location", () => {
    fetch.mockResolvedValue("Moscow");
    const expected = "Moscow";
    getCurrentCityTitle().then((data) => {
      expect(typeof data).toBe("string");
      expect(data).toBe(expected);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://get.geojs.io/v1/ip/geo.json");
    });
  });

  it("handles exception in getCurrentCityTitle", () => {
    fetch.mockRejectedValue(new Error("API failure"));
    getCurrentCityTitle().catch(() => {
      expect(fetch).toThrow("API failure");
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://get.geojs.io/v1/ip/geo.json");
    });
  });

  it("get dataWeather for same city", () => {
    fetch.mockResolvedValue(
      JSON.stringify({
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
      })
    );
    getWeatherData().then((data) => {
      expect(data.main.temp).toBe(1.83);
      expect(data.name).toEqual("Elista");
      expect(data.weather[0].description).toEqual("overcast clouds");
      expect(data.weather[0].icon).toEqual("04n");
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
