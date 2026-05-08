const express = require("express");
const auth = require("../middleware/auth");
const {
  allBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");

const router = express.Router();

router.get("/", auth, allBookmarks);

router.get("/add/:id", auth, addBookmark);

router.get("/remove/:id", auth, removeBookmark);

module.exports = router;
