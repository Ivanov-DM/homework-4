import { createForm } from "./index";

describe("Tests for index.js", () => {
  let el;
  beforeEach(() => {
    el = document.createElement("div");
    el.id = "container";
    console.log("Hello form BeforeEach");
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
});
