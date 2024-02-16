const { convertToJSDate } = require('../ases.js');

describe('convertToJSDate', () => {
    test('sollte korrekt ein Datum im Format dd.mm.yy konvertieren', () => {
        expect(convertToJSDate('01.05.23')).toEqual(new Date(2023, 4, 1));
    });

    test('sollte korrekt ein Datum im Format d.m.yyyy konvertieren', () => {
        expect(convertToJSDate('1.4.2023')).toEqual(new Date(2023, 3, 1));
    });

    test('sollte korrekt ein Datum im Format dd/mm/yy konvertieren', () => {
        expect(convertToJSDate('12/12/22')).toEqual(new Date(2022, 11, 12));
    });

    test('sollte korrekt ein Datum im Format d/m/yyyy konvertieren', () => {
        expect(convertToJSDate('1/4/2023')).toEqual(new Date(2023, 3, 1));
    });

    // Randomisierte Tests
    for (let i = 0; i < 10; i++) {
        const day = Math.floor(Math.random() * 28) + 1;
        const month = Math.floor(Math.random() * 12) + 1;
        const year = Math.floor(Math.random() * 30) + 2000;

        test(`sollte korrekt ein zufälliges Datum konvertieren: ${day}.${month}.${year}`, () => {
            expect(convertToJSDate(`${day}.${month}.${year}`)).toEqual(new Date(year, month - 1, day));
        });
    }
});