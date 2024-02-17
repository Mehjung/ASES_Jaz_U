const { berechneWerktage } = require("../ases.js");

describe("berechneWerktage", () => {
  test("sollte korrekt die Werktage in einer Woche berechnen", () => {
    const startDatum = new Date(2023, 0, 2); // 2. Januar 2023 (Montag)
    const endDatum = new Date(2023, 0, 8); // 8. Januar 2023 (Sonntag)
    expect(berechneWerktage(startDatum, endDatum)).toBe(5);
  });

  test("sollte korrekt die Werktage in einem Monat berechnen", () => {
    const startDatum = new Date(2023, 0, 1); // 1. Januar 2023 (Sonntag)
    const endDatum = new Date(2023, 0, 31); // 31. Januar 2023 (Dienstag)
    expect(berechneWerktage(startDatum, endDatum)).toBe(22);
  });
});
