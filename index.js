const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: __dirname + "/.env" });
const OneMinTrx = require("./controller/OneMinTrx");
const ThreeMinTrx = require("./controller/ThreeMinTrx");
const FiveMinTrx = require("./controller/FiveMinTrx");
const OneMinWinGo = require("./controller/OneMinWinGo");
const ThreeMinWinGo = require("./controller/ThreeMinWinGo");
const FiveMinWinGo = require("./controller/FiveMinWinGo");
const moment = require("moment");
const schedule = require("node-schedule");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const allRoutes = require("./routes/Routes");
app.use("", allRoutes);
let x = true;
if (x) {
  console.log("Waiting for the next minute to start...");
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  console.log(
    "start after ",
    moment(new Date()).format("HH:mm:ss"),
    secondsUntilNextMinute
  );

  setTimeout(() => {
    OneMinTrx.insertOneMinTrxResultByCron();
    OneMinTrx.generatedTimeEveryAfterEveryOneMinTRX(io);
    OneMinWinGo.generatedTimeEveryAfterEveryOneMin(io);
    ThreeMinWinGo.generatedTimeEveryAfterEveryThreeMin(io);
    FiveMinWinGo.generatedTimeEveryAfterEveryFiveMin(io);
    x = false;
  }, secondsUntilNextMinute * 1000);
}

const finalRescheduleJob = schedule.scheduleJob(
  "15,30,45,0 * * * *",
  function () {
    ThreeMinTrx.generatedTimeEveryAfterEveryThreeMinTRX(io);
    FiveMinTrx.generatedTimeEveryAfterEveryFiveMinTRX(io);
  }
);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port truecoine.", process.env.PORT);
});
