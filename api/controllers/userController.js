const User = require("../models/User");
const { generateToken } = require("../utils/tokens");

const signup = async (req, res) => {
  try {
    const { email, password, name, lastName } = req.body;
    const data = await User.findOrCreate({
      where: { email, password, name, lastName },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.send(401);
    const payload = {
      email: user.email,
      name: user.name,
      lastname: user.lastName,
    };

    const boolean = await user.validatePassword(password);

    if (!boolean) {
      return res.send(401);
    } else {
      let token = generateToken(payload);

      res.cookie("token", token).send(payload);
    }
  } catch (err) {
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
