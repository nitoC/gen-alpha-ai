const jwt = require("jsonwebtoken");

const genToken = (email, secret) => {
  const token = jwt.sign({ email }, secret, { expiresIn: "30s" });

  return token;
};

const verifyToken = (token, secret) => {
  const isverified = jwt.verify(token, secret);

  return isverified;
};

module.exports = { genToken, verifyToken };
