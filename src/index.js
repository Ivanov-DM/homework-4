import { sum } from "./example";

function component() {
  const element = document.createElement("div");
  element.innerHTML = `1 + 2 = ${sum(1, 2)}`;
  return element;
}

document.body.appendChild(component());
