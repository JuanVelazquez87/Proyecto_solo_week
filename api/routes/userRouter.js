const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { generateToken } = require("../utils/tokens");

router.post("/singup", (req, res, next) => {
  const { email, password, name, lastName } = req.body;

  User.findOrCreate({ where: { email, password, name, lastName } })
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email },
  }).then((user) => {
    let payload = {
      email: user.email,
      name: user.name,
      lastname: user.lastName,
    };
    if (!user) return res.send(401);
    user.validatePassword(req.body.password).then((boolean) => {
      if (!boolean) {
        return res.send(401);
      } else {
        let token = generateToken(payload);

        res.cookie("token", token).send(payload);
      }
    });
  });
});

module.exports = router;
