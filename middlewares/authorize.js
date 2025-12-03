const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET_KEY;

const authorize = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];
      const user = verifyToken(token, secret);
      req.user = user;
      next();
    }
    return res
      .status(401)
      .json({ message: "unauthorized access please login" });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "unauthorized access please login", err });
  }
  //   !authorization.startsWith("Bearer") &&
  //     res.status(401).json({ message: "unauthorized access please login" });
};

module.exports = authorize;
