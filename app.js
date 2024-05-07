// third party modules
const express = require("express");
const cors = require("cors")
const { cloudinaryConfig } = require("./utilities/cloudinary-config");
const app = express();
const news_routes = require("./routes/news");
const corsOptions = {
  //origin: 'https://sudo-delivery-frontend.vercel.app',
  exposedHeaders: "*",
};

app.use(cors(corsOptions));


app.get("/chek", (req, res) => {
  res.send("Hello World");
});
app.use("/api", news_routes);

module.exports = app;
