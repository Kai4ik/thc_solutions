const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

/*const fs = require("fs");
const https = require("https");

const options = {
  cert: fs.readFileSync("d92260101f60a08c.crt"),
  key: fs.readFileSync("server.key"),
};*/

const { ApiError, Client, Environment } = require("square");
require("dotenv").config({ path: "./configuration/config.env" });

const connectDB = require("./models/database");
connectDB();

// creating express app object
const app = express();
const PORT = process.env.PORT || 5000;
const client = new Client({
  timeout: 3000,
  environment: Environment.Sandbox, // `Environment.Sandbox` to access sandbox resources
  accessToken: process.env.ACCESS_TOKEN,
});

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const products = require("./routes/products");
app.use("/api/products", products);

const registration = require("./routes/registration");
app.use("/api/registration", registration);

const login = require("./routes/login");
app.use("/api/login", login);

app.post("/process-payment", jsonParser, async (req, res) => {
  // Charge the customer's card
  const payments_api = client.paymentsApi;
  const request_body = {
    sourceId: req.body.nonce,
    amountMoney: {
      amount: req.body.total * 100,
      currency: "CAD",
    },
    idempotencyKey: req.body.idempotency_key,
  };

  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      title: "Payment Successful",
      result: response,
    });
  } catch (error) {
    let errorResult = null;
    if (error instanceof ApiError) {
      errorResult = error.errors;
    } else {
      errorResult = error;
    }
    res.status(500).json({
      title: "Payment Failure",
      result: errorResult,
    });
  }
});

// callback function that called after server starts listening for requests
const serverStart = () => console.log(`Server listening on ${PORT}`);

//const server = https.createServer(options, app);
// setups server that listens on specified port
app.listen(PORT, serverStart);
