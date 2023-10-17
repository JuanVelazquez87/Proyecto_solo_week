const { token } = require("morgan");
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
      firstName: user.firstName,
      lastName: user.lastName,
      favorites: user.favorites,
    };

    const boolean = await user.validatePassword(password);

    if (!boolean) {
      return res.send(401);
    } else {
      let token = generateToken(payload);
      res.cookie("token", token).json({ payload, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const me = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ where: { email } });
    console.log("user en /me", user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const getAllFavorites = async (req, res) => {
  try {
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};

const addFavorite = async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);

    const newContent = req.body.data;
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user) {
      const DuplicateFavorite = user.favorites.find(
        (favorite) => favorite.contentId === contentId
      );

      if (DuplicateFavorite) {
        return res
          .status(401)
          .json({ message: "This content is already in your favorites list" });
      }
    }

    user.favorites = [...user.favorites, newContent];

    await user.save();

    return res
      .status(200)
      .json({ user, message: "Content added to favorites" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);

    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (user) {
      user.favorites = user.favorites.filter(
        (favorite) => favorite.contentId != contentId
      );

      await user.save();

      res.status(200).json({ user, message: "content successfully removed" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signup,
  login,
  me,
  getAllFavorites,
  addFavorite,
  removeFromFavorites,
};
