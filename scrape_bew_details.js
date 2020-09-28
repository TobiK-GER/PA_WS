//erstellt ab 14.09.2020
//In dieser Version des Scrapers für die studentischen Bewertungen werden auf Ebene der Einzelbewertung (Anklicken
//Überschrift einer Bewertung) auch die Meta-Daten wie insb. Standort, Alter, Geschlecht, JAhr des St_Beginns usw.
//erfasst. Außerdem die Detail-Sternebewertungen zu Orga, Dozenten, Bib usw.
//Die ganz große Kapelle!

const puppeteer = require('./node_modules/puppeteer');
const fs = require('fs');
const path = require('path');
const writeCSV = require('./writeCSV')

const sleep = require('util').promisify(setTimeout);

//Zielseite, über die in den ersten Detailreport eingestiegen werden muss
var zielUrl = "https://www.studycheck.de/hochschulen/hs-fresenius/bewertungen";

//Constructor für den Report-Datensatz samt aller Meta-Daten
function Report(a, b, c, d, e, f, g, h, i){
      this.age = a;
      this.sex = b;
      this.abschlus = c;
      this.beginn = d;
      this.form = e;
      this.standort = f;
      this.hzb = g;
      this.empf = h;
      this.datum = i;
    }
//zentrale Programmlogik für Datenerfassung und Speicherung
const hsBewertungenLesen = async () => {

try {
//headless: true auf false setzen um chromium Fenster während Ausführung zu sehen
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")
    await page.goto(zielUrl, { waitUntil: 'domcontentloaded' });
//warten einer beliebigen Dauer - muss nicht randomisiert werden, da nur 1 Mal pro Programmnutzung, nicht in Schleife
    await sleep(5270);

//für die Schleife über alle Seiten mit Hochschulen muss die letzte/maximale Seite der Pagination ermittelt werden
    var numberOfPagesToScrape = await page.evaluate(() => {
      let pagesString = document.querySelector("div.col-md-4:nth-child(2)").innerText
//innerText der Box mit der Anzahl der Seiten ist Zahl-Wortkombi ("Seite 1 von 24")- muss gesplittet werden
      let pagesNumArray = pagesString.split(' ');
      let pagesNumInt = pagesNumArray[3];
      return pagesNumInt;
    });


//Schleife über alle Seiten von .../hochschulen/
    //for(counter = 1; counter <= numberOfPagesToScrape; counter++) {

    //im Falle der kompletten Details jeder einzelnen Bewertung muss blockweise vorgegangen werden
      for(counter = 1; counter = 5; counter++){

//abweichend vom Vorgehen beim Scrapen der Daten aus den 4 Bewertungs-Divs je Seite unter "alle Bewertungen"
//wird jetzt hier eine Ebene tiefer alles mögliche abgegriffen, ist aber jeweils nur einmal vorhanden, bevor auf
//weiter/nächste Seite geklickt wird.

  var bewertDetails = await page.evaluate(() => {

    //erste Idee: Jedes Element von Interesse einzeln ablutschen!?

          let text = document.querySelector("div.report-text")
          let alter = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(1) > span")
          let geschlecht = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(2) > span")
        //  let abschluss = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(3) > span").innerText
          let name = document.querySelector("div .footer-left > strong")
          let datum = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(8) > span")
          let standort = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(5) > span")
          let studForm = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(4) > span")
          let jahrBeginn = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(3) > span")
          let schulabschluss = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(6) > span")
          let empfehlung = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child(7) > span")

          //und jetzt noch der Detail-Rating-Block mit den Sternen je Kategorie

          let studInhalte = document.querySelector(".report-ratings > ul:nth-child(1) > li:nth-child(1) > div .rating-value")
          let dozenten = document.querySelector(".report-ratings > ul:nth-child(1) > li:nth-child(2) > div .rating-value")
          let lehrveranstaltungen = document.querySelector(".report-ratings > ul:nth-child(1) > li:nth-child(3) > div .rating-value")
          let ausstattung = document.querySelector(".report-ratings > ul:nth-child(1) > li:nth-child(4) > div .rating-value")
          let organisation = document.querySelector(".report-ratings > ul:nth-child(1) > li:nth-child(5) > div .rating-value")
          let bibliothek = document.querySelector(".report-ratings > ul:nth-child(1) > li:nth-child(6) > div .rating-value")

        });

//Daten der Seite in hochschulen-Array pushen und universitiesFacts mit spread-Syntax in Constructor schieben
      await console.log(bewertDetails);
      await bewertDetails.map(facts => new Report(...facts));


      //next Page - nur wenn noch nicht letzte Seite!
      if (counter < numberOfPagesToScrape ) {
        await page.evaluate( () => {
      //"Weiter-Button" über querySelector selektieren
            let nextButton = document.querySelector("div.col-xs-6.col-md-4.right-col > div > div.text > a");
            nextButton.click();
            });
      //pausieren für zufällige Zeit in ms - min 8 sec - max 8 + 1,0 * 5 = 13 sec
        await sleep(4000+(Math.random()*5000));
      }

    }
//Browser-Instanz beenden
    await browser.close();

// //stringify zu JSON-Format und schreiben in die JSON-Datei
//     var datensatz = JSON.stringify(texte, 2);
// //Kontrolle des stringify-Befehls
//     //console.log(typeof(datensatz));
// //Vorbereiten des Speicherns mit aktuellem Datum für eine Art erste Versionierung der Datensatzes
//     let datum = new Date();
// //Basisdaten zu Hochschulen, die mit Tag, Monat und Jahr des Ausführungszeitpunktes verknüpft werden
//     let dateiName = "HSF-Details-" + datum.getDate() + "-" + (datum.getMonth() + 1) + "-" + datum.getFullYear();
// //Dateiname für die JSON-Version (Variable "dateiName" wird auch noch für das CSV-Format benötigt)
//     let dateiNameJson = dateiName + ".json";
// //writeFile-Methode benötigt String mit Pfadangabe
//     let pfadJson = path.join('./',dateiNameJson);
//     fs.writeFile(pfadJson, datensatz, (error) =>{
//       if(error) throw err;
//     });
// //Aufruf der csvSpeichern-Funktion aus dem "Modul" (Js-Datei) writeCSV um CSV-Export zu starten
//     writeCSV.csvSpeichern(pfadJson, dateiName);
}
catch(e){
  console.log("Fehler", e);
}
}

//Aufruf der function expression die oben zunächst nur deklariert ist
hsBewertungenLesen();
