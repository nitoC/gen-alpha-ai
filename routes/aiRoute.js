const main = require("../utils/prompt");

const router = require("express").Router();

router.post("/prompt", async (req, res) => {
  try {
    console.log(req.body, "body");
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "bad request" });
    const response = await main(prompt);
    res.status(200).json({ message: response });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
