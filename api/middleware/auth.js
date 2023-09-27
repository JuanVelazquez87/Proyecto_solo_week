const { validateToken } = require("../utils/tokens");

const validateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.split(" ")[1]) {
      const token = authHeader.split(" ")[1];

      const payload = validateToken(token);

      if (payload) {
        req.user = payload;
        return next();
      }
      res.status(401).json({ message: "authorization failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = validateUser;
