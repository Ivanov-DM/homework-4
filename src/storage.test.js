import { saveList, readList, drawList } from "./storage";

describe("tests for storage.js", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("save items in localStorage)", () => {
    function IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
    const item = "Moscow";
    saveList(item);
    expect(IsJsonString(global.localStorage.getItem(item))).toBeTruthy();
    expect(JSON.parse(global.localStorage.getItem(item))).toEqual(item);
  });

  it("read list from localStorage", () => {
    const item1 = "Moscow";
    const item2 = "Rostov";
    saveList(item1);
    saveList(item2);
    expect(readList()).not.toBeNull();
    expect(readList()).toEqual(["Moscow", "Rostov"]);
  });

  it("draw list from localStorage", () => {
    const el = document.createElement("div");
    const item1 = "Moscow";
    const item2 = "Rostov";
    saveList(item1);
    saveList(item2);
    const list = readList();
    drawList(el, list);
    const li = el.getElementsByTagName("li");
    expect(li.length).toBe(2);
    expect(li[0].innerHTML).toEqual(item1);
    expect(li[1].innerHTML).toEqual(item2);
  });
});
