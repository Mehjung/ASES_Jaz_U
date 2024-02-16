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

  // Randomisierte Tests
  for (let i = 0; i < 10; i++) {
    const startTag = Math.floor(Math.random() * 28) + 1;
    const startMonat = Math.floor(Math.random() * 12);
    const startJahr = Math.floor(Math.random() * 30) + 2000;

    const endTag = Math.floor(Math.random() * 28) + 1;
    const endMonat = Math.floor(Math.random() * 12);
    const endJahr = startJahr + Math.floor(Math.random() * 5);

    let startDatum = new Date(startJahr, startMonat, startTag);
    let endDatum = new Date(endJahr, endMonat, endTag);

    // Stellen Sie sicher, dass das Startdatum vor dem Enddatum liegt
    if (startDatum > endDatum) {
      [startDatum, endDatum] = [endDatum, startDatum];
    }

    test(`sollte korrekt die Werktage zwischen zwei zufälligen Daten berechnen: ${startDatum} und ${endDatum}`, () => {
      const erwarteteTage = berechneWerktage(startDatum, endDatum);
      expect(erwarteteTage).toBeGreaterThanOrEqual(0);
      expect(erwarteteTage).toBeLessThanOrEqual(
        (endDatum - startDatum) / (1000 * 60 * 60 * 24)
      );
    });
  }
});
