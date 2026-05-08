const express = require("express");
const {
  allData,
  allSeries,
  allMovies,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", allData);

router.get("/series", allSeries);

router.get("/movies", allMovies);

module.exports = router;
