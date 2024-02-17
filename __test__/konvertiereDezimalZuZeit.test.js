const { konvertiereDezimalZuZeit } = require("../ases");

test("sollte 0 korrekt in '0:00' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(0)).toBe("0:00");
});

test("sollte -0 korrekt in '0:00' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(-0)).toBe("0:00");
});

test("sollte 24 korrekt in '24:00' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(24)).toBe("24:00");
});

test("sollte -24 korrekt in '-24:00' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(-24)).toBe("-24:00");
});

test("sollte 12.5 korrekt in '12:30' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(12.5)).toBe("12:30");
});

test("sollte -12.5 korrekt in '-12:30' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(-12.5)).toBe("-12:30");
});
test("sollte -0.6 korrekt in '-0:36' konvertieren", () => {
  expect(konvertiereDezimalZuZeit(-0.6)).toBe("-0:36");
});

describe("konvertiereDezimalZuZeit", () => {
  for (let i = 0; i < 100; i++) {
    // Generieren Sie eine zufällige Dezimalzahl zwischen -130.7 und 130.7
    let dezimal = (Math.random() - 0.5) * 261.4;
    dezimal = parseFloat(dezimal.toFixed(2));

    test(`sollte korrekt eine zufällige Dezimalzahl konvertieren: ${dezimal}`, () => {
      // Konvertieren Sie die Dezimalzahl in einen Zeitstring
      const zeitString = konvertiereDezimalZuZeit(dezimal);

      // Extrahieren Sie die Stunden und Minuten aus dem Zeitstring
      let [stunden, minuten] = zeitString.split(":").map(Number);

      // Überprüfen Sie das Vorzeichen
      vorzeichen = zeitString.includes("-") ? -1 : 1;

      // Machen Sie die Stunden positiv, wenn sie negativ sind
      stunden = Math.abs(Number(stunden));

      // Überprüfen Sie, ob die Stunden und Minuten korrekt sind
      expect(stunden).toBeCloseTo(Math.floor(Math.abs(dezimal)));
      expect(minuten).toBeCloseTo(Math.round((Math.abs(dezimal) % 1) * 60));

      // Überprüfen Sie das Vorzeichen
      if (dezimal < 0) {
        expect(vorzeichen).toBe(-1);
      } else {
        expect(vorzeichen).toBe(1);
      }
    });
  }
});
