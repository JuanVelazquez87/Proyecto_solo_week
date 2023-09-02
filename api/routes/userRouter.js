const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { signup, login, logout } = require("../controllers/userController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;
