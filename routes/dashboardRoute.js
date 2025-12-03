const router = require("express").Router();
const authorize = require("../middlewares/authorize");

router.get("/dashboard", authorize, (req, res) => {
  const { user } = req;
  res.status(200).send(`welcome user ${user.email}`);
});

module.exports = router;
