const { berechneUrlaub } = require("../ases.js");

test("berechneUrlaub für einen Monat mit 5 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 5, "2023-01-01", "2023-02-01")).toBe(2);
});

test("berechneUrlaub für ein Jahr mit 5 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 5, "2023-01-01", "2024-01-01")).toBe(24);
});

test("berechneUrlaub für ein Jahr mit 4 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 4, "2023-01-01", "2024-01-01")).toBe(19.2);
});

test("berechneUrlaub für ein Jahr mit 3 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 3, "2023-01-01", "2024-01-01")).toBe(14.4);
});

test("berechneUrlaub für ein Jahr mit 2 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 2, "2023-01-01", "2024-01-01")).toBe(9.6);
});

test("berechneUrlaub für ein Jahr mit 1 Arbeitstag pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 1, "2023-01-01", "2024-01-01")).toBe(4.8);
});

test("berechneUrlaub für ein halbes Jahr mit 5 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 5, "2023-01-01", "2023-07-01")).toBe(12);
});

test("berechneUrlaub für ein Quartal mit 5 Arbeitstagen pro Woche und 24 Urlaubstagen", () => {
  expect(berechneUrlaub(24, 5, "2023-01-01", "2023-04-01")).toBe(6);
});

test("berechneUrlaub für ein Jahr mit 5 Arbeitstagen pro Woche und 30 Urlaubstagen", () => {
  expect(berechneUrlaub(30, 5, "2023-01-01", "2024-01-01")).toBe(30);
});

test("berechneUrlaub für ein Jahr mit 5 Arbeitstagen pro Woche und 20 Urlaubstagen", () => {
  expect(berechneUrlaub(20, 5, "2023-01-01", "2024-01-01")).toBe(20);
});
