const puppeteer = require('./node_modules/puppeteer');

var url = "http://my-user-agent.com"

const userAgent = async function getUserAgent(){
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1960,
      height: 720
    });
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.screenshot({path: 'userAgent.png'});
    await browser.close();

  }
  userAgent();
