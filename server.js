const express = require("express");
const cors = require("cors");
const clientSessions = require("client-sessions");

const connectDB = require("./models/database");
connectDB();

// creating express app object
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(
  clientSessions({
    cookieName: "session",
    secret: "week10example_web322",
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60,
  })
);

const products = require("./routes/products");
app.use("/api/products", products);

const registration = require("./routes/registration");
app.use("/api/registration", registration);

const login = require("./routes/login");
app.use("/api/login", login);

// callback function that called after server starts listening for requests
const serverStart = () =>
  console.log(`Server listening on ${process.env.PORT}`);

// setups server that listens on specified port
app.listen(PORT, serverStart);
