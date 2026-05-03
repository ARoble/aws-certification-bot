import { Composer } from "grammy";
import { BotContext } from "../../types";

const composer = new Composer<BotContext>();

composer.command("start", (ctx) =>
  ctx.reply(
    "Welcome! I'm your AWS DVA-C02 study buddy. 📚\n\n" +
      "📘 Course Mode:\n" +
      "/course - View full course outline & progress\n" +
      "/learn - Start or continue your course\n" +
      "/next - Go to next lesson\n" +
      "/module 1 - Jump to a specific module (1-4)\n\n" +
      "🎯 Quick Practice:\n" +
      "/quiz - Get a practice question\n" +
      "/quiz <topic> - Quiz on a specific topic\n" +
      "/topic <name> - Learn about an AWS topic\n" +
      "/score - Check your quiz score\n" +
      "/help - Show available commands"
  )
);

composer.command("help", (ctx) =>
  ctx.reply(
    "Available commands:\n\n" +
      "📘 Course Mode:\n" +
      "/course - View full course outline & progress\n" +
      "/learn - Start or continue your course\n" +
      "/next - Go to next lesson\n" +
      "/module 1 - Jump to a specific module (1-4)\n\n" +
      "🎯 Quick Practice:\n" +
      "/quiz - Get a random DVA-C02 practice question\n" +
      "/quiz Lambda - Quiz on a specific AWS topic\n" +
      "/topic DynamoDB - Learn about an AWS topic\n" +
      "/score - See your quiz stats\n" +
      "/help - Show this message"
  )
);

export default composer;
