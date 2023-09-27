const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { signup, login, logout, me } = require("../controllers/userController");
const validateUser = require("../middleware/auth");

router.post("/signup", signup);

router.post("/login", login);

router.get("/me", validateUser, me);

router.get("/logout", logout);

module.exports = router;
