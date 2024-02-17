function convertToJSDate(deutschesDatum) {
  // Ersetzen Sie alle Nicht-Ziffern durch Bindestriche
  var formatiertesDatum = deutschesDatum.replace(/\D/g, "-");

  // Teilen Sie das Datum in Tag, Monat und Jahr auf
  var teile = formatiertesDatum.split("-");

  // Stellen Sie sicher, dass das Jahr vier Ziffern hat
  if (teile[2].length === 2) {
    teile[2] = "20" + teile[2];
  }

  // Erstellen Sie ein neues Datum
  var datum = new Date(teile[2], teile[1] - 1, teile[0]);

  return datum;
}

function berechneWerktage(startDatum, endDatum) {
  var start = new Date(startDatum);
  var end = new Date(endDatum);
  var totalTage = 0;

  // Zähle jeden Tag zwischen Start und Ende
  for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
    // Wenn der Tag kein Wochenende ist, zähle ihn
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      totalTage++;
    }
  }

  return totalTage;
}

function konvertiereZeitString(zeitString) {
  // Ersetzen Sie alle Doppelpunkte und Punkte durch Kommas
  var formatierterString = zeitString.replace(/[:.]/g, ",");

  return formatierterString;
}

function konvertiereZeitZuDezimal(zeitString) {
  // Teilen Sie den String an dem Komma auf
  var teile = zeitString.split(",");

  // Extrahieren Sie Stunden und Minuten aus den Teilen
  var stunden = parseInt(teile[0]);
  var minuten = (teile[1] || "0").padEnd(2, "0"); // Füllen Sie die Minuten mit führenden Nullen auf, falls nötig

  minuten = parseInt(minuten); // Parsen Sie die Minuten in eine Ganzzahl

  // Speichern Sie das Vorzeichen der Stunden
  var vorzeichen = zeitString.includes("-") ? -1 : 1;

  // Wenden Sie die Betragsfunktion auf Stunden und Minuten an
  stunden = Math.abs(stunden);

  // Konvertieren Sie die Minuten in Stunden und addieren Sie sie zu den Stunden
  var dezimal = stunden + minuten / 60;

  // Wenden Sie das gespeicherte Vorzeichen auf das Ergebnis an
  dezimal *= vorzeichen;

  return dezimal;
}

function konvertiereDezimalZuZeit(dezimal) {
  // Speichern Sie das Vorzeichen der Dezimalzahl
  var vorzeichen = dezimal < 0 ? "-" : "";

  // Wenden Sie die Betragsfunktion auf die Dezimalzahl an
  dezimal = Math.abs(dezimal);

  // Extrahieren Sie die Stunden und Minuten aus der Dezimalzahl
  var stunden = Math.floor(dezimal);
  var minuten = Math.round((dezimal - stunden) * 60);
  // Fügen Sie führende Nullen zu den Minuten hinzu, falls nötig
  minuten = minuten.toString().padStart(2, "0");

  // Erstellen Sie den Zeitstring
  var zeitString = `${vorzeichen}${stunden}:${minuten}`;

  return zeitString;
}

function berechneVolleMonate(begin, ende) {
  // Erstellen Sie Datum-Objekte aus den Beginn- und Ende-Strings
  const beginDatum = new Date(begin);
  const endeDatum = new Date(ende);

  // Setzen Sie die Datumszeiger auf den ersten Tag des Monats
  const beginMonat = new Date(
    beginDatum.getFullYear(),
    beginDatum.getMonth(),
    1
  );
  const endeMonat = new Date(endeDatum.getFullYear(), endeDatum.getMonth(), 1);

  let monate = 1;

  // Schleife bis die Monate und Jahre gleich sind oder bis das Enddatum erreicht ist
  while (beginMonat < endeMonat && endeDatum > beginMonat) {
    // Fügen Sie einen Monat hinzu
    beginMonat.setMonth(beginMonat.getMonth() + 1);
    monate++;
  }
  // Wenn das Startdatum nicht am ersten Tag des Monats liegt, ziehen Sie einen Monat ab
  if (beginDatum.getDate() !== 1) {
    monate--;
  }
  // Wenn das Enddatum nicht der letzte Tag des Monats ist, ziehen Sie einen Monat ab
  if (
    endeDatum.getDate() !==
    new Date(endeDatum.getFullYear(), endeDatum.getMonth() + 1, 0).getDate()
  ) {
    monate--;
  }

  return Math.max(monate, 0);
}

function berechneUrlaub(
  Urlaubsanspruch,
  ArbeitstageJeWoche,
  Eintrittsdatum,
  Austrittsdatum
) {
  // Berechnen Sie die Anzahl der vollen Monate, die der Mitarbeiter gearbeitet hat
  var volleMonate = berechneVolleMonate(Eintrittsdatum, Austrittsdatum);

  // Berechnen Sie den Urlaubsanspruch pro Monat
  var urlaubsanspruchProMonat = Urlaubsanspruch / 12;

  // Berechnen Sie den Urlaubsanspruch für die gearbeiteten Monate
  var urlaubsanspruch =
    (volleMonate * urlaubsanspruchProMonat * ArbeitstageJeWoche) / 5;

  return urlaubsanspruch;
}

function reduceUrlaubValues(...objects) {
  return objects.reduce((accumulator, currentValue) => {
    // Überprüfen, ob das aktuelle Objekt einen Wert hat
    if (currentValue && typeof currentValue.value === "number") {
      // Addiere den Wert des aktuellen Objekts zum Akkumulator
      accumulator += currentValue.value;
    }
    return Math.ceil(accumulator);
  }, 0); // Starten Sie den Akkumulator mit 0
}

function reduceDecimals(...objects) {
  return objects.reduce((accumulator, currentValue) => {
    // Überprüfen, ob das aktuelle Objekt einen Wert hat
    if (currentValue && typeof currentValue.value === "number") {
      // Addiere den Wert des aktuellen Objekts zum Akkumulator
      accumulator += currentValue.value;
    }
    return Math.round(accumulator);
  }, 0); // Starten Sie den Akkumulator mit 0
}

module.exports = {
  reduceDecimals,
  reduceUrlaubValues,
  berechneUrlaub,
  berechneVolleMonate,
  convertToJSDate,
  berechneWerktage,
  konvertiereZeitString,
  konvertiereZeitZuDezimal,
  konvertiereDezimalZuZeit,
};
