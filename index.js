const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const dashRoute = require("./routes/dashboardRoute");
const aiRoute = require("./routes/aiRoute");
const dbConnect = require("./db/db");

dotenv.config({ debug: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", dashRoute);
app.use("/api", aiRoute);

app.listen(port, () => {
  dbConnect();
  console.log("running on port:" + port);
});
