const express = require("express");
const {
  getHomePage,
  generateNewShortUrl,
  getAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.get("/", getHomePage);

router.post("/", generateNewShortUrl);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
