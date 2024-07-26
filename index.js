const express = require("express");
const connectDb = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");
const dotenv = require("dotenv");
const path = require("path");
const createHttpError = require("http-errors");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectory));

app.use("/", urlRouter);

app.get("/:shorId", async (req, res, next) => {
  try {
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
    if (!entry) {
      throw createHttpError.NotFound("Short url doest not exist");
    }
    res.redirect(entry.redirectUrl);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("index", { error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
