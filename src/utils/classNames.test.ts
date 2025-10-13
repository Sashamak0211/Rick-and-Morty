import classNames from "./classNames";

test("Возвращает строку из одного класса", () => {
  expect(classNames("asdasd")).toBe("asdasd");
});
test("Объединяет несколько классов", () => {
  expect(classNames("button", "input", "kolya")).toBe("button input kolya");
});

test("Игнорирует фальси значения", () => {
  expect(classNames("button", undefined, false, null)).toBe("button");
});
test("Возвращает пустую строку", () => {
  expect(classNames()).toBe("");
});
