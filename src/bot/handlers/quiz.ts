import { Composer, InlineKeyboard } from "grammy";
import { BotContext } from "../../types";
import { generateQuizQuestion, explainWrongAnswer } from "../../services/openai";

const composer = new Composer<BotContext>();

composer.command("quiz", async (ctx) => {
  const topic = ctx.match ? ctx.match.trim() : undefined;

  await ctx.reply("Generating a question...");

  try {
    const question = await generateQuizQuestion(topic || undefined);
    ctx.session.quiz.activeQuestion = question;

    const optionsText = question.options.map((o) => `  ${o}`).join("\n");
    const keyboard = new InlineKeyboard()
      .text("A", "quiz_answer_0")
      .text("B", "quiz_answer_1")
      .text("C", "quiz_answer_2")
      .text("D", "quiz_answer_3");

    await ctx.reply(
      `📝 ${question.topic}\n\n${question.question}\n\n${optionsText}`,
      { reply_markup: keyboard }
    );
  } catch (error) {
    console.error("Error generating quiz question:", error);
    await ctx.reply(
      "Sorry, I had trouble generating a question. Please try again in a moment."
    );
  }
});

// Handle quiz answer callbacks
composer.callbackQuery(/^quiz_answer_(\d)$/, async (ctx) => {
  await ctx.answerCallbackQuery();

  const question = ctx.session.quiz.activeQuestion;
  if (!question) {
    await ctx.reply("No active question. Use /quiz to get a new one.");
    return;
  }

  const chosenIndex = parseInt(ctx.match[1]!, 10);

  // Remove answer buttons to prevent double-tap
  await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } });

  ctx.session.quiz.totalAnswered++;

  if (chosenIndex === question.correctIndex) {
    ctx.session.quiz.score++;
    await ctx.reply(
      `✅ Correct!\n\n${question.explanation}\n\n` +
        `Score: ${ctx.session.quiz.score}/${ctx.session.quiz.totalAnswered}`,
      {
        reply_markup: new InlineKeyboard()
          .text("Next Question", "quiz_next")
          .text("See Score", "quiz_score"),
      }
    );
  } else {
    try {
      const explanation = await explainWrongAnswer(question, chosenIndex);
      await ctx.reply(
        `❌ Incorrect.\n\n` +
          `You chose: ${question.options[chosenIndex]}\n` +
          `Correct: ${question.options[question.correctIndex]}\n\n` +
          `${explanation}\n\n` +
          `Score: ${ctx.session.quiz.score}/${ctx.session.quiz.totalAnswered}`,
        {
          reply_markup: new InlineKeyboard()
            .text("Next Question", "quiz_next")
            .text("See Score", "quiz_score"),
        }
      );
    } catch (error) {
      console.error("Error explaining wrong answer:", error);
      await ctx.reply(
        `❌ Incorrect.\n\n` +
          `You chose: ${question.options[chosenIndex]}\n` +
          `Correct: ${question.options[question.correctIndex]}\n\n` +
          `${question.explanation}\n\n` +
          `Score: ${ctx.session.quiz.score}/${ctx.session.quiz.totalAnswered}`,
        {
          reply_markup: new InlineKeyboard()
            .text("Next Question", "quiz_next")
            .text("See Score", "quiz_score"),
        }
      );
    }
  }

  ctx.session.quiz.activeQuestion = null;
});

// "Next Question" button
composer.callbackQuery("quiz_next", async (ctx) => {
  await ctx.answerCallbackQuery();

  await ctx.reply("Generating a question...");

  try {
    const question = await generateQuizQuestion();
    ctx.session.quiz.activeQuestion = question;

    const optionsText = question.options.map((o) => `  ${o}`).join("\n");
    const keyboard = new InlineKeyboard()
      .text("A", "quiz_answer_0")
      .text("B", "quiz_answer_1")
      .text("C", "quiz_answer_2")
      .text("D", "quiz_answer_3");

    await ctx.reply(
      `📝 ${question.topic}\n\n${question.question}\n\n${optionsText}`,
      { reply_markup: keyboard }
    );
  } catch (error) {
    console.error("Error generating quiz question:", error);
    await ctx.reply(
      "Sorry, I had trouble generating a question. Please try again."
    );
  }
});

// "See Score" button and /score command
composer.callbackQuery("quiz_score", async (ctx) => {
  await ctx.answerCallbackQuery();
  const { score, totalAnswered } = ctx.session.quiz;
  const pct = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  await ctx.reply(
    `📊 Your Score\n\n` +
      `Correct: ${score}/${totalAnswered} (${pct}%)`
  );
});

composer.command("score", async (ctx) => {
  const { score, totalAnswered } = ctx.session.quiz;
  const pct = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  await ctx.reply(
    `📊 Your Score\n\n` +
      `Correct: ${score}/${totalAnswered} (${pct}%)`
  );
});

export default composer;
