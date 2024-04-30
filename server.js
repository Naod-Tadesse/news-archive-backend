const server = require("./app");
const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const schedule = require("node-schedule");
const { run } = require("./utilities/screenshot");
const connectToDatabase = require("./config/database");
// Load environment variables before using them
dotenv.config({ path: "./config/config.env" });

connectToDatabase();

server.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );

  // Schedule the run function to be called every 6 hours
  schedule.scheduleJob("0 */6 * * *", async () => {
    try {
      await run();
    } catch (error) {
      console.error("Error running the screenshot function:", error);
      // Handle the error here, e.g., log it or send a notification
    }
  });
});
