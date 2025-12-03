const joi = require("joi");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const userModel = require("../model/userModel");
const { genToken } = require("../utils/token");
const sendMail = require("../utils/mailer");
// joi schema for validating user auth information
dotenv.config();

const secret = process.env.SECRET_KEY;

const requestSchema = joi.object({
  email: joi.string().min(10).required(),
  password: joi.string().min(6).required(),
});

//register middleware

(" john@gmail.com ");
("john@gmail.com");
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailParsed = email && email.trim().toLowerCase();

    console.log(emailParsed);
    try {
      const isValid = await requestSchema.validateAsync({
        email: emailParsed,
        password,
      }); // validate request
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
    let userExist = await userModel.findOne({ email: emailParsed });

    if (userExist)
      return res.status(409).json({ message: "user exists login!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // hashes password
    console.log(hashedPassword);

    const savedUser = await userModel.create({
      email: emailParsed,
      password: hashedPassword,
    });

    sendMail(emailParsed);
    res.status(201).json({ payload: savedUser });
  } catch (err) {
    console.log(err);

    res.status(500).json({ err, message: err.message });
  }
};

//login custom middleware
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailParsed = email && email.trim().toLowerCase();

    console.log(emailParsed);
    try {
      const isValid = await requestSchema.validateAsync({
        email: emailParsed,
        password,
      }); // validate request
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
    let userExist = await userModel.findOne({ email: emailParsed });

    if (!userExist)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });

    const correctPassword = await bcrypt.compare(password, userExist.password); //compares password from database with user sent password

    if (!correctPassword)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });

    const token = genToken(emailParsed, secret); // generate user token

    res.status(200).json({ correctPassword, token });
  } catch (err) {}
};

module.exports = { register, login };
