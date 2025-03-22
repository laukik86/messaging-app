const http = require("http"); // ✅ Ensure this is imported
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const setupSocket = require("./socketHandler"); // ✅ Import `socket.js`
require("dotenv").config();
const app = express();
const server = http.createServer(app); // ✅ Create an HTTP server

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

setupSocket(server); // ✅ Attach socket.io to HTTP server

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
