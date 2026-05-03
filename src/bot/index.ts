import { Bot, session } from "grammy";
import { config } from "../config";
import { BotContext, SessionData } from "../types";
import startHandlers from "./handlers/start";
import quizHandlers from "./handlers/quiz";
import topicHandlers from "./handlers/topic";
import courseHandlers from "./handlers/course";
import lessonHandlers from "./handlers/lesson";
import { errorHandler } from "./handlers/error";

export const bot = new Bot<BotContext>(config.botToken);

bot.use(
  session({
    initial: (): SessionData => ({
      quiz: { activeQuestion: null, score: 0, totalAnswered: 0 },
      course: null,
      activeLesson: null,
    }),
  })
);

bot.use(startHandlers);
bot.use(quizHandlers);
bot.use(topicHandlers);
bot.use(courseHandlers);
bot.use(lessonHandlers);

bot.catch(errorHandler);
