const { konvertiereZeitString } = require("../ases.js");

describe("konvertiereZeitString", () => {
  test("sollte korrekt einen Zeitstring im Format mm:ss konvertieren", () => {
    expect(konvertiereZeitString("43:46")).toBe("43,46");
  });

  test("sollte korrekt einen Zeitstring im Format m:s konvertieren", () => {
    expect(konvertiereZeitString("4:6")).toBe("4,6");
  });

  test("sollte korrekt einen Zeitstring im Format mm.ss konvertieren", () => {
    expect(konvertiereZeitString("43.46")).toBe("43,46");
  });

  test("sollte korrekt einen Zeitstring im Format m.s konvertieren", () => {
    expect(konvertiereZeitString("4.6")).toBe("4,6");
  });

  // Randomisierte Tests
  for (let i = 0; i < 10; i++) {
    const minuten = Math.floor(Math.random() * 60);
    const sekunden = Math.floor(Math.random() * 60);

    test(`sollte korrekt einen zufälligen Zeitstring konvertieren: ${minuten}:${sekunden}`, () => {
      expect(konvertiereZeitString(`${minuten}:${sekunden}`)).toBe(
        `${minuten},${sekunden}`
      );
    });
  }
});
