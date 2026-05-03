import { Composer, InlineKeyboard } from "grammy";
import { BotContext } from "../../types";
import { explainTopic, generateQuizQuestion } from "../../services/openai";

const composer = new Composer<BotContext>();

composer.command("topic", async (ctx) => {
  const topic = ctx.match ? ctx.match.trim() : "";

  if (!topic) {
    await ctx.reply(
      "Please specify a topic. Examples:\n\n" +
        "/topic Lambda\n" +
        "/topic DynamoDB\n" +
        "/topic API Gateway\n" +
        "/topic S3\n" +
        "/topic SQS\n" +
        "/topic CloudFormation\n" +
        "/topic IAM\n" +
        "/topic CodeDeploy\n" +
        "/topic X-Ray"
    );
    return;
  }

  await ctx.reply(`Looking up ${topic}...`);

  try {
    const explanation = await explainTopic(topic);
    await ctx.reply(explanation, {
      reply_markup: new InlineKeyboard().text(
        `Quiz me on ${topic}`,
        `quiz_topic_${topic}`
      ),
    });
  } catch (error) {
    console.error("Error explaining topic:", error);
    await ctx.reply(
      "Sorry, I had trouble explaining that topic. Please try again."
    );
  }
});

// "Quiz me on this" button from topic explanations
composer.callbackQuery(/^quiz_topic_(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();

  const topic = ctx.match[1]!;
  await ctx.reply(`Generating a ${topic} question...`);

  try {
    const question = await generateQuizQuestion(topic);
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

export default composer;
