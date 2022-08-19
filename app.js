const express = require("express");
const Router = require("./routes/index");
const app = express();
require("dotenv").config();
const port = process.env.Port;

app.use(express.json());

app.use("/api", Router);

app.get("/", (req, res) => {
  res.status(200).json({ massage: "연동 잘 됨." });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

module.exports = app;
