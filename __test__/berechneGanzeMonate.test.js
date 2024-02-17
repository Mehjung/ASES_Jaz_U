const { berechneVolleMonate } = require("../ases.js");

expect.extend({
  toBeOrBePlusOne(received, argument) {
    const pass = received === argument || received === argument + 1;
    if (pass) {
      return {
        message: () =>
          `expected ${received} to be equal to ${argument} or ${argument + 1}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be equal to ${argument} or ${argument + 1}`,
        pass: false,
      };
    }
  },
});

test("berechneVolleMonate für einen vollen Monat", () => {
  expect(berechneVolleMonate("2023-01-01", "2023-02-01")).toBe(1);
});

test("berechneVolleMonate für weniger als einen vollen Monat", () => {
  expect(berechneVolleMonate("2023-01-01", "2023-01-31")).toBe(1);
});

test("berechneVolleMonate für mehr als einen vollen Monat", () => {
  expect(berechneVolleMonate("2023-01-01", "2023-02-02")).toBe(1);
});

test("berechneVolleMonate für ein volles Jahr", () => {
  expect(berechneVolleMonate("2023-01-01", "2024-01-01")).toBe(12);
});

test("berechneVolleMonate für ein Schaltjahr", () => {
  expect(berechneVolleMonate("2024-01-01", "2025-01-01")).toBe(12);
});

test("berechneVolleMonate für ein Jahr minus einen Tag", () => {
  expect(berechneVolleMonate("2023-01-01", "2023-12-31")).toBe(12);
});

test("berechneVolleMonate für ein Jahr plus einen Tag", () => {
  expect(berechneVolleMonate("2023-01-01", "2024-01-02")).toBe(12);
});

test("berechneVolleMonate für ein Jahr mit einem Monat weniger", () => {
  expect(berechneVolleMonate("2023-02-01", "2024-01-01")).toBe(11);
});

test("berechneVolleMonate für ein Jahr mit einem Monat mehr", () => {
  expect(berechneVolleMonate("2023-01-01", "2024-02-01")).toBe(13);
});

test("berechneVolleMonate für kein volles Jahr", () => {
  expect(berechneVolleMonate("2023-01-15", "2024-01-14")).toBe(11);
});

describe("Berechnung von vollen Monaten für 100 zufällige Testfälle", () => {
  // Teste 100 zufällige Testfälle
  for (let i = 0; i < 100; i++) {
    // Generiere zufällige Beginn- und Enddaten im Bereich von 2000 bis 2099
    const randomYear = Math.floor(Math.random() * 100) + 2000;
    const randomMonthBegin = Math.floor(Math.random() * 12) + 1;
    const randomMonthEnd = Math.floor(Math.random() * 12) + 1;
    const randomDayBegin = Math.floor(Math.random() * 28) + 1; // Bis 28, um Schaltjahre zu vermeiden
    const randomDayEnd = Math.floor(Math.random() * 28) + 1;
    const beginDatum = `${randomYear}-${
      randomMonthBegin < 10 ? "0" : ""
    }${randomMonthBegin}-${randomDayBegin < 10 ? "0" : ""}${randomDayBegin}`;
    const endDatum = `${randomYear}-${
      randomMonthEnd < 10 ? "0" : ""
    }${randomMonthEnd}-${randomDayEnd < 10 ? "0" : ""}${randomDayEnd}`;

    // Erwartete Anzahl von Monaten berechnen
    let erwarteteMonate;
    let berechneteMonate;

    // Überprüfen, ob das Beginndatum größer als das Enddatum ist
    if (beginDatum < endDatum) {
      erwarteteMonate = berechneVolleMonate(beginDatum, endDatum);
      berechneteMonate = Math.floor(
        (new Date(endDatum) - new Date(beginDatum)) /
          (1000 * 60 * 60 * 24 * 30.44)
      );
    } else {
      erwarteteMonate = berechneVolleMonate(endDatum, beginDatum);
      berechneteMonate = Math.floor(
        (new Date(beginDatum) - new Date(endDatum)) /
          (1000 * 60 * 60 * 24 * 30.44)
      );
    }

    // Berechnete Anzahl von Monaten basierend auf tatsächlichem Datum

    // Testfall für jede Iteration
    test(`Test ${
      i + 1
    }: sollte korrekt die Monate zwischen zwei zufälligen Daten berechnen: ${beginDatum} und ${endDatum}`, () => {
      // Überprüfen, ob die erwarteten Monate mit den berechneten Monaten übereinstimmen

      expect(berechneteMonate).toBeOrBePlusOne(Math.max(erwarteteMonate, 0));

      // Wenn die erwarteten Monate um 1 von den berechneten Monaten abweichen
    });
  }
});
