export function saveList(items) {
  localStorage.setItem(`${items}`, JSON.stringify(items));
}

export function readList() {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== "loglevel:webpack-dev-server") {
      items.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  return items;
}

export function drawList(el, items) {
  if (items.length === 0) {
    return;
  }
  const validItems = items.slice(0, 10);
  el.innerHTML = `<ul>${validItems
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul>`;
}
