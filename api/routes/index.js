const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");

router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.send("API OK");
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").sendStatus(204);
});

module.exports = router;
