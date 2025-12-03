const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connUri = process.env.CONN_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(connUri);
    console.log("db connected");
  } catch (err) {
    console.log({ message: "unable to connect to db", err });
    return { message: "unable to connect to db", err };
  }
};

module.exports = dbConnect;
