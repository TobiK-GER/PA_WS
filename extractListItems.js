//letzter VErsuch vom 28.09. (Zugfahrt) Es kommt der innerText aller li-Items an!
//Jetzt weiter mit Integration der Stringvergleiche in den Loop
//weiter in Kopie, wenn Erweiterung der for-Schleife nicht funktioniert

const puppeteer = require('../node_modules/puppeteer');
const sleep = require('util').promisify(setTimeout);

//Zielseite, über die in den ersten Detailreport eingestiegen werden muss
var zielUrl = "https://www.studycheck.de/studium/psychologie/hs-fresenius-2488/bericht-289988";

//zentrale Programmlogik für Datenerfassung und Speicherung
const hsBewertungenLesen = async () => {

try {
//headless: true auf false setzen um chromium Fenster während Ausführung zu sehen
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")
    await page.goto(zielUrl, { waitUntil: 'domcontentloaded' });
//warten einer beliebigen Dauer - muss nicht randomisiert werden, da nur 1 Mal pro Programmnutzung, nicht in Schleife
    await sleep(1500);
//
    let metaListe = await page.evaluate(() => {
      let divMeta = document.getElementsByClassName("card reports-authorinfo hidden-sm-down");
      let listLength = divMeta[0].getElementsByTagName("li").length;
      return listLength;
    });
    console.log("die liste ist lang: " + metaListe);
    await sleep(3250);

//für die Schleife über alle Seiten mit Hochschulen muss die letzte/maximale Seite der Pagination ermittelt werden
//     var numberOfPagesToScrape = await page.evaluate(() => {
//       let pagesString = document.querySelector("div.col-md-4:nth-child(2)").innerText
// //innerText der Box mit der Anzahl der Seiten ist Zahl-Wortkombi ("Seite 1 von 24")- muss gesplittet werden
//       let pagesNumArray = pagesString.split(' ');
//       let pagesNumInt = pagesNumArray[3];
//       return pagesNumInt;
//     });


//Schleife über alle Seiten von .../hochschulen/
    //for(counter = 1; counter <= numberOfPagesToScrape; counter++) {


//abweichend vom Vorgehen beim Scrapen der Daten aus den 4 Bewertungs-Divs je Seite unter "alle Bewertungen"
//wird jetzt hier eine Ebene tiefer alles mögliche abgegriffen, ist aber jeweils nur einmal vorhanden, bevor auf
//weiter/nächste Seite geklickt wird.
let text = [];
for (let counter = 1; counter <= metaListe; counter++) {
  text = await page.evaluate((counter) => {
  let liElements = document.querySelector(`div.card-block > ul.list-unstyled > li:nth-child(${counter})`).innerText.trim();
  return liElements;
  }, counter);
  console.log(text);
};

let bewertDetails = await page.evaluate((text) => {

  let studForm;
  let studDauer;
  let jahrBeginn;
  let aktFS;
  let abschluss;
  let standort;
  let schulabschluss;
  let geschlecht;
  let alter = '27';
  let abiSchnitt;
  let empfehlung;

  //RegEx für den innerText-Vergleich der DOM-Einzelelemente
      const patt_jahrStudBeginn = /^Studienbeginn/;
      const patt_abschluss = /^Abschluss/i;
      const patt_aktFS = /^Aktuelles/;
      const patt_studienForm = /^Studienform/;
      const patt_standort = /^Standort/;
      const patt_schulAbschluss = /^Schulabschluss/;
      const patt_studienDauer = /^Studiendauer/;
      const patt_geschlecht = /^Geschlecht/;
      const patt_alter = /^Alter/;
      const patt_abiSchnitt = /^Abischnitt/;
      const patt_empfehl = /^Weiterempfehlung/;



// for-loop klappt aktuell überhaupt nicht

  if(!document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+")"))
    {return;}
    else{
      if(patt_studienForm.test(text)) {
        let studForm = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
      }else{
        if(patt_studienDauer.test(text)) {
          let studDauer = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
        }else{
          if(patt_jahrStudBeginn.test(text)) {
            let jahrBeginn = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
          }else{
            if(patt_aktFS.test(text)) {
              let aktFS = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
            }else{
              if(patt_abschluss.test(text)) {
                let abschluss = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
              }else{
                if(patt_standort.test(text)) {
                  let standort = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
                }else{
                  if(patt_schulAbschluss.test(text)) {
                    let schulabschluss = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
                  }else{
                    if(patt_geschlecht.test(text)) {
                      let geschlecht = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
                    }else{
                      if(patt_alter.test(text)) {
                        let alter = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
                        return alter;
                      }else{
                        if(patt_abiSchnitt.test(text)) {
                          let abiSchnitt = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
                        }else{
                          if(patt_empfehl.test(text)) {
                            let empfehlung = document.querySelector("div.card-block > ul.list-unstyled > li:nth-child("+i+") > span").innerText;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  return [
    studForm,
    studDauer,
    jahrBeginn,
    aktFS,
    abschluss,
    standort,
    schulabschluss,
    geschlecht,
    alter,
    abiSchnitt,
    empfehlung
  ];
});

}catch(e){
  console.log("Fehler", e);}

}

hsBewertungenLesen();
