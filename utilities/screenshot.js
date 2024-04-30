const puppeteer = require("puppeteer");
const os = require("os");
const path = require("path");
const { cloudinary } = require("./cloudinary-config");
const { NewsScreenshot } = require("../models/news-screenshot");
const fs = require("fs/promises");

exports.run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.bbc.com/news", { timeout: 60000 }); // Set timeout to 60 seconds

  // Scroll to the bottom of the page to trigger image loading
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait for some time after scrolling to allow images to load
  await page.evaluate(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 5000); // Adjust the timeout value as needed
    });
  });

  // Wait for all visible images to be loaded
  await page.waitForSelector("img[src]", { visible: true });

  const currentDate = new Date();
  const dateOfShot = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const dateName = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}-${currentDate.getHours()}-${currentDate.getMinutes()}`;
  const fileName = `bbc-${dateName}.png`;

  // Get the temporary directory path
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, fileName);

  await page.screenshot({
    path: filePath,
    fullPage: true,
  });

  console.log(`Successfully captured screenshot: ${filePath}`);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "thenewsarchive",
      public_id: fileName.substring(0, fileName.lastIndexOf(".")),
    });

    const newScreenshot = new NewsScreenshot({
      url: result.url,
      createdDate: dateName,
      website: "BBC",
      dateOfScreenshot: dateOfShot,
    });
    await newScreenshot.save();
    await fs.unlink(filePath);
  } catch (error) {
    console.log(`Deleted local file: ${filePath}`);
    console.error(error);
  }
  await browser.close();
};
