const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
  signup,
  login,
  me,
  getAllFavorites,
  addFavorite,
  removeFromFavorites,
} = require("../controllers/userController");

const validateUser = require("../middleware/auth");

router.post("/signup", signup);

router.post("/login", login);

router.get("/me", validateUser, me);
router.get("/favorites", validateUser, getAllFavorites);
router.post("/favorites/add/:contentId", validateUser, addFavorite);
router.delete(
  "/favorites/remove/:contentId",
  validateUser,
  removeFromFavorites
);

module.exports = router;
