const Movie = require("../models/movies");

const allBookmarks = async (req, res) => {
  try {
    const { userId } = req.user;

    const bookmarks = await Movie.find({ bookmarkedBy: userId });

    return res.status(200).json({
      data: bookmarks,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $addToSet: { bookmarkedBy: userId } },
    );

    if (!movie) {
      return res.status(404).json({ message: `No movie found with ID: ${id}` });
    }

    return res.status(200).json({ message: "Movie Bookmarked" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } },
    );

    if (!movie) {
      return res.status(404).json({ message: `No movie found with ID: ${id}` });
    }

    return res.status(200).json({ message: "Bookmark Removed Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
