const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
const cors = require("cors");
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

app.listen(process.env.PORT, () => {
  console.log("Server is running on port truecoine.", process.env.PORT);
});


// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);

//     // Fork workers
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//         // Optionally restart the worker
//         cluster.fork();
//     });
// } else {
//     const express = require("express");
//     const bodyParser = require("body-parser");
//     require("dotenv").config({ path: __dirname + "/.env" });
//     const cors = require("cors");

//     const app = express();
//     const corsOptions = {
//       origin: "*",
//       credentials: true,
//       optionSuccessStatus: 200,
//     };
//     app.use(cors(corsOptions));
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(bodyParser.json());

//     const allRoutes = require("./routes/Routes");
//     app.use("", allRoutes);

//     app.listen(process.env.PORT, () => {
//         console.log(`Worker ${process.pid} started and Server is running on port ${process.env.PORT}`);
//     });
// }
