const jwt = require("jsonwebtoken");
const { Error } = require("sequelize");
const SECRET = "nuncalosabras";

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

function validateToken(token) {
  if (!token) {
    throw new Error("no Token priveded");
  }
  try {
    const response = jwt.verify(token, SECRET);

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateToken, validateToken };
