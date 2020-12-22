export function createForm(el) {
  if (el !== null) {
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
}

const container = document.querySelector("#container");
createForm(container);
