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
  console.log(minuten);
  minuten = parseInt(minuten); // Parsen Sie die Minuten in eine Ganzzahl
  console.log(minuten);
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

console.log(konvertiereZeitZuDezimal("0,3"));

module.exports = {
  convertToJSDate,
  berechneWerktage,
  konvertiereZeitString,
  konvertiereZeitZuDezimal,
};
