const express = require("express");
const router = express.Router();
const { getNews } = require("../controllers/news");
router.route("/getnews").get(getNews);

module.exports = router;
