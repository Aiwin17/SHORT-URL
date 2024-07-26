const shortid = require("shortid");
const URL = require("../models/url");

const getHomePage = (req, res) => {
  res.render("index");
};

const generateNewShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(404).json({ error: "Url is required" });
    const shortID = shortid();
    await URL.create({
      shortId: shortID,
      redirectUrl: url,
      visitHistory: [],
    });
    return res.status(200).json({
      short_url: `${process.env.BASE_URL}${process.env.PORT}/${shortID}`,
    });
  } catch (error) {
    console.log("Error in generateNewShortUrl: ", error.message);
  }
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
module.exports = { getHomePage, generateNewShortUrl, getAnalytics };
