import { createForm, getCurrentCityTitle } from "./index";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ city: "Moscow" }),
  })
);

describe("Tests for index.js", () => {
  let el;

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
    const expected = "Moscow";
    return getCurrentCityTitle().then((data) => {
      expect(typeof data).toBe("string");
      expect(data).toBe(expected);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://get.geojs.io/v1/ip/geo.json");
    });
  });

  it("handles exception with null", () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("API failure"))
    );
    return getCurrentCityTitle().then((data) => {
      expect(data).toEqual(null);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://get.geojs.io/v1/ip/geo.json");
    });
  });
});
