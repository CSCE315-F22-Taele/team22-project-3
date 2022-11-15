const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const PORT = process.env.SERVER_PORT || 5432;

const indexRoute = require("./dbRoutes/index"); // Test routes
const orderRoute = require("./dbRoutes/order");
const checkoutRoute = require("./dbRoutes/checkout");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
app.use("/api/index", indexRoute); // Test Routes
app.use("/api/order", orderRoute);
app.use("/api/checkout", checkoutRoute);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../react-pos/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});