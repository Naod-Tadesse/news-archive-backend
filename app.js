// third party modules
const express = require("express");
const { cloudinaryConfig } = require("./utilities/cloudinary-config");
const app = express();
const news_routes = require("./routes/news");
app.use("/api", news_routes);

module.exports = app;
