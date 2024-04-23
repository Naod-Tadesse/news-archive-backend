const puppeteer = require("puppeteer");

exports.run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/");
  await page.screenshot({
    path: "bbc.png",
  });
  await browser.close();
};
