
//worked with URL https://www.studycheck.de/studium/physiotherapie
//delivers viewport size image of site

const paramURL = process.argv[2];
  if(!paramURL) {
    throw "Bitte ZielURL angeben nach Dateiname"
  }

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(paramURL);
  await page.screenshot({path: 'screenshot.png'});
  browser.close();

}
run();
