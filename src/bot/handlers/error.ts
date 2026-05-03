import { BotError } from "grammy";
import { BotContext } from "../../types";

export function errorHandler(err: BotError<BotContext>) {
  const ctx = err.ctx;
  const error = err.error;

  console.error(`Error while handling update ${ctx.update.update_id}:`, error);

  ctx.reply("Something went wrong. Please try again.").catch((e) =>
    console.error("Failed to send error message:", e)
  );
}
