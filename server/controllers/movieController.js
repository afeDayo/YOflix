const Movies = require("../models/movies");

const allData = async (req, res) => {
  try {
    const data = await Movies.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allSeries = async (req, res) => {
  try {
    const series = await Movies.find({ type: "series" });
    res.status(200).json({ data: series });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allMovies = async (req, res) => {
  try {
    const movies = await Movies.find({ type: "movie" });
    res.status(200).json({ data: movies });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { allData, allSeries, allMovies };
