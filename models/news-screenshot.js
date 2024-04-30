const mongoose = require("mongoose");

const newsScreenshotSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  dateOfScreenshot: {
    type: String,
  },
});

const NewsScreenshot = mongoose.model("NewsScreenshot", newsScreenshotSchema);
exports.NewsScreenshot = NewsScreenshot;
