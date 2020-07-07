
const puppeteer = require('./node_modules/puppeteer');

//später soll die URL als Parameter des Funktionsaufrufs übergeben werden
//const url = process.argv[2]; if (!url) {  throw "Please provide URL as a first argument";}
var zielUrl = "https://www.studycheck.de/hochschulen/hs-fresenius/";

const hsfPageVisits = async function getHits(){
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(zielUrl);

    const ergebnis = await page.evaluate(() => {
      let pageHits = Array.from(document.querySelectorAll('div .hits span')).map(span => span.innerText);
      //const liste = [...ueberSchriften];
    //  return liste.map(h => h.innerText);
      return pageHits;
    });

console.log(ergebnis);

await browser.close();

};
hsfPageVisits();


// scrape().then((value) => {
//     console.log(value); // Success!
// });
