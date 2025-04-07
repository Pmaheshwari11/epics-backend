const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001; // Let environment choose, fallback to 3001

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("WebSocket server is running!");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Restrict this in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on("alarm", () => {
    console.log("🚨 Alarm received from:", socket.id);
    io.emit("alarm");
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
