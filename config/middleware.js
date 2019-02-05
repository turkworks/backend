const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtKey = require("../_secrets/keys").jwtKey;

module.exports = {
  authenticate,
  generateToken
};

function generateToken(coordinator) {
  const payload = {
    username: coordinator.username
  };
  const secret = jwtKey;

  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}
