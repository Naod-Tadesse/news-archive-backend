const { NewsScreenshot } = require("../models/news-screenshot");

exports.getNews = async (req, res) => {
  const { date } = req.query;
  const news = await NewsScreenshot.find({ dateOfScreenshot: date });
  if (!news) return res.status(404).send("No news found for the given date");
  res.json(news);
};
