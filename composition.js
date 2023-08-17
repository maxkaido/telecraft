const express = require("express");
const mongoose = require("mongoose");
const Bull = require("bull");
const { Telegraf } = require("telegraf");
const { createContainer, asValue } = require("awilix");
const { scopePerRequest } = require("awilix-express");
const http = require("http");
const socketIo = require("socket.io");
const { compose } = require("ramda");

// Database setup
function useDatabase(url) {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  return mongoose;
}

// Job queue setup
function useJobQueue(redisUrl) {
  return new Bull("jobs", redisUrl);
}

// Telegram bot setup
function useTelegrafBot(token) {
  const bot = new Telegraf(token);
  bot.start((ctx) => ctx.reply("Hello from the bot!"));
  bot.launch();
  return bot;
}

// Express server setup
function useServer() {
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  return { app, server };
}

// Main function to compose everything
function createApp({ mongoUrl, redisUrl, botToken, host, port }) {
  const db = useDatabase(mongoUrl);
  const jobQueue = useJobQueue(redisUrl);
  const bot = useTelegrafBot(botToken);
  const { app, server } = useServer();

  // Dependency Injection using Awilix
  const container = createContainer();
  container.register({
    bot: asValue(bot),
    jobQueue: asValue(jobQueue),
  });
  app.use(scopePerRequest(container));

  app.get("/api/v1/hello", (req, res) => {
    res.json({ message: "Hello from API!" });
  });

  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}

// Environment variables
const config = {
  mongoUrl: process.env.MONGO_URL,
  redisUrl: process.env.REDIS_URL,
  botToken: process.env.BOT_TOKEN,
  host: process.env.HOST || "127.0.0.1",
  port: process.env.PORT || 3000,
};

createApp(config);
