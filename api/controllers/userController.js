const User = require("../models/User");
const { generateToken } = require("../utils/tokens");

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const [newUser, createUser] = await User.findOrCreate({
      where: { email },
      defaults: { firstName, lastName, email, password },
    });
    if (!createUser) {
      res.status(409).json("Error: user alredy exist");
    } else {
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(401).json("error: incorrect information");
    const payload = {
      email: user.email,
      name: user.firstName,
      lastname: user.lastName,
    };

    const boolean = await user.validatePassword(password);

    if (!boolean) {
      return res.send(401);
    } else {
      let token = generateToken(payload);
      console.log("token", token);
      res.cookie("token", token, { httpOnly: true }).json(payload, token);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").sendStatus(204);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
