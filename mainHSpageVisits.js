
const puppeteer = require('./node_modules/puppeteer');

//später soll die URL als Parameter des Funktionsaufrufs übergeben werden
//const url = process.argv[2]; if (!url) {  throw "Please provide URL as a first argument";}
var zielUrl = "https://www.studycheck.de/hochschulen/hs-fresenius/";

function HSMain(name, anzAufrufe, anzBewertungen, weiterEmpfQuote){
      this.nameHS = name;
      this.anzSeitenAufrufe = anzAufrufe;
      this.anzBewertungen = anzBewertungen;
      this.empfQuote = weiterEmpfQuote;
}

const hsfPageVisits = async function getHits(){

  try{
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    //page.goto kann neben der Url auch nach, das Argument {waitUntil: '' aufnehmen}
    //{waitUntil kann auf "networkIdle0" oder 2, aber auch auf "domcontentloaded" gesetzt werden!}
    await page.goto(zielUrl, {waitUntil: 'domcontentloaded'});

      // Im folgenden werden diverse Elemente der Hochschulhauptseite erfasst und anschließend in ein Object gegeben
      // Eigentlich braucht es "Array.from" für diese Einzelelemente nicht! Beispiel "nameHS" ohne Array

      // Name der HS erfasen
      var nameHS = await page.evaluate(() => {
        let name = document.querySelector('h1').innerText;
        return name;
      });
      // Anzahl der Seitenaufrufe auf Studycheck - unklar wie genau gezählt wird, wenn z.B. direkt auf Subseite gegangen wird
      var anzSeitenAufrufe = await page.evaluate(() => {
        let pageHits = Array.from(document.querySelectorAll('div .hits span')).map(span => span.innerText);
        //const liste = [...ueberSchriften]; Diese zwei Zeilen sind nur Erinnerung an ein altes Vorgehen gem. Tutorial
      //  return liste.map(h => h.innerText);
        return pageHits;
      });
      // Anzahl der Bewertungen die eine HS erhalten hat
      var anzBewertungen = await page.evaluate(() => {
        let nbReviews = Array.from(document.querySelectorAll('span.report-count')).map(span => span.innerText);
        //const liste = [...ueberSchriften];
      //  return liste.map(h => h.innerText);
        return nbReviews;
      });
      // Weiterempfehlungsquote
      var empfQuote = await page.evaluate(() => {
        //  return liste.map(h => h.innerText);
        let quote = Array.from(document.querySelectorAll('span.recommendation')).map(span => span.innerText);
        return quote;
      });
// das funktioniert nicht, wahrscheinlich weil die Parameter nicht unbedingt schon returnt wurden
// var hauptdaten = new HSmain(name, anzSeitenAufrufe, anzBewertungen, empfQuote);

// Versuch mit Promise.all() - läuft!!!
    Promise.all([nameHS, empfQuote, anzBewertungen, anzSeitenAufrufe])
      .then(daten => {
        console.log(daten);
      })
      
      // der folgende console.log() kam vor dem log aus Promise.all, brachte aber alle Daten
      //  await console.log(nameHS, anzSeitenAufrufe, anzBewertungen, empfQuote);


    await browser.close();
  }
  catch(e){
    console.log("Fehler", e);
  }
};
hsfPageVisits();


// scrape().then((value) => {
//     console.log(value); // Success!
// });
