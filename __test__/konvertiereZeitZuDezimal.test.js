const { konvertiereZeitZuDezimal } = require("../ases.js");

describe("konvertiereZeitZuDezimal", () => {
  test("sollte korrekt einen positiven Zeitstring im Format h,mm konvertieren", () => {
    expect(konvertiereZeitZuDezimal("7,48")).toBeCloseTo(7.8, 2);
  });

  test("sollte korrekt einen negativen Zeitstring im Format -h,mm konvertieren", () => {
    expect(konvertiereZeitZuDezimal("-5,30")).toBeCloseTo(-5.5, 2);
  });

  test("sollte korrekt einen Zeitstring ohne Minuten konvertieren", () => {
    expect(konvertiereZeitZuDezimal("3")).toBeCloseTo(3, 2);
  });

  // Randomisierte Tests für positive Zeitstrings
  for (let i = 0; i < 100; i++) {
    const stunden = Math.floor(Math.random() * 24); // Zufällige Stunden zwischen 0 und 23
    const minuten = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    const zeitString = `${stunden},${minuten}`;
    test(`sollte korrekt einen zufälligen positiven Zeitstring ${zeitString} konvertieren`, () => {
      expect(konvertiereZeitZuDezimal(zeitString)).toBeCloseTo(
        stunden + minuten / 60,
        2
      );
    });
  }

  for (let i = 0; i < 100; i++) {
    const stunden = Math.floor(Math.random() * 24); // Zufällige Stunden zwischen 0 und 23
    const minuten = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    const zeitString = `-${stunden},${minuten}`;
    test(`sollte korrekt einen zufälligen positiven Zeitstring ${zeitString} konvertieren`, () => {
      expect(konvertiereZeitZuDezimal(zeitString)).toBeCloseTo(
        -1 * (stunden + minuten / 60),
        2
      );
    });
  }

  // Test für Zeitstring ohne Minuten
});
