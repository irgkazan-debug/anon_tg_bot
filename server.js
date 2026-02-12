import express from "express";
import { Telegraf } from "telegraf";

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

if (!BOT_TOKEN || !CHANNEL_ID) {
  throw new Error("Environment variables missing");
}

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  await ctx.reply("Привет! Напиши сообщение — я анонимно отправлю его в канал.");
});

bot.on("text", async (ctx) => {
  try {
    await ctx.telegram.sendMessage(
      CHANNEL_ID,
      "Анонимно:\n\n" + ctx.message.text
    );
    await ctx.reply("Готово");
  } catch (e) {
    console.error(e);
    await ctx.reply("Ошибка отправки.");
  }
});

app.get("/", (req, res) => res.send("OK"));
app.listen(process.env.PORT || 3000);

bot.launch();
