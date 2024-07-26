const express = require("express");
const connectDb = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json());

app.use("/url", urlRouter);

app.get("/:shorId", async (req, res) => {
  const shortId = req.params.shorId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
