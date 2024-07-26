const shortid = require("shortid");
const URL = require("../models/url");

const generateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(404).json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.status(200).json({ id: shortID });
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
module.exports = { generateNewShortUrl, getAnalytics };
