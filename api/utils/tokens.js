const jwt = require("jsonwebtoken");
const SECRET = "nuncalosabras";

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

//ction validateToken(params) {}

module.exports = { generateToken };
