import { Telegraf } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("Please define the BOT_TOKEN environment variable");
}

const bot = new Telegraf(BOT_TOKEN);

// Middleware: Log every message
bot.use((ctx, next) => {
  const { message } = ctx.update;
  if (message) {
    const { chat, text } = message;
    console.log(`Received message from ${chat.username}: ${text}`);
  }
  return next();
});

// Command: /start
bot.start((ctx) => ctx.reply("Welcome to TeleCraft!"));

// Command: /help
bot.help((ctx) => ctx.reply("How can I assist you?"));

// On every text message
bot.on("text", (ctx) => ctx.reply("Received your message!"));

// Start the bot
const initializeBot = () => {
  bot.launch();
  console.log("TeleCraft bot started successfully");
};

export default initializeBot;

export { initializeBot };
