const express = require("express");
const Router = require("./routes/index");
const fs = require("fs");
const http = require("http");
const https = require("https");
const app = express();
require("dotenv").config();
const port = process.env.Port;
const cors = require("cors");

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/jinyeop.shop/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/jinyeop.shop/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/jinyeop.shop/cert.pem"),
};
app.use(express.static("public"));

const corsOptions = {
  // origin: true, // 출처 허용 옵션
  origin: "https://cloneclone-99hanghae.vercel.app/",
  origin: "https://e-02-clfe.vercel.app/",
  // withCredentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", Router);

app.get("/", (req, res) => {
  res.status(200).json({ massage: "연동 잘 됨." });
});

// app.listen(port, () => {
//   console.log(port, "포트로 서버가 열렸어요!");
// });

http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);

module.exports = app;
