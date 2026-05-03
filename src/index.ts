import express from "express";
import { config } from "./config";
import { bot } from "./bot";
import healthRouter from "./routes/health";

const app = express();
app.use(express.json());
app.use(healthRouter);

async function main() {
  bot.start();
  console.log("Bot started in polling mode");

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

main();
