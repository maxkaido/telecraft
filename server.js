import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.json());

// Sample API endpoint
app.get("/api/v1/hello", (req, res) => {
  res.json({ message: "Hello, TeleCraft!" });
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const setupServer = () => {
  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return server;
};

export { setupServer };
