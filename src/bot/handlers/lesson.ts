import { Composer, InlineKeyboard } from "grammy";
import { BotContext } from "../../types";
import {
  getLessonContext,
  getNextLesson,
  getNextIncompleteLesson,
  getFirstLessonId,
  formatLessonHeader,
} from "../../data/course-helpers";
import {
  generateLessonExplanation,
  generateLessonExample,
  generateExamTip,
  generateLessonQuiz,
  generateSimplifiedExplanation,
} from "../../services/course-ai";

const composer = new Composer<BotContext>();

export async function startLesson(ctx: BotContext, lessonId: string): Promise<void> {
  const lessonCtx = getLessonContext(lessonId);
  if (!lessonCtx) {
    await ctx.reply("Lesson not found. Try /course to see available lessons.");
    return;
  }

  await ctx.reply("⏳ Preparing your lesson...");

  const explanation = await generateLessonExplanation(lessonCtx.lesson, lessonCtx.domain);

  ctx.session.activeLesson = {
    domainId: lessonCtx.domain.id,
    taskId: lessonCtx.task.id,
    lessonId,
    step: "explain",
    quizState: null,
    masteryFailed: false,
  };

  if (!ctx.session.course) {
    ctx.session.course = {
      currentLessonId: lessonId,
      completedLessons: [],
      scores: {},
    };
  }
  ctx.session.course.currentLessonId = lessonId;

  const header = formatLessonHeader(lessonId);
  const keyboard = new InlineKeyboard().text("▶️ See Example", "lesson_continue");

  await ctx.reply(`${header}\n\n📖 Explanation:\n\n${explanation}`, {
    reply_markup: keyboard,
  });
}

// /learn and /next — resume or start next lesson
composer.command(["learn", "next"], async (ctx) => {
  // If mid-lesson, resume it
  if (ctx.session.activeLesson) {
    const lessonId = ctx.session.activeLesson.lessonId;
    await startLesson(ctx, lessonId);
    return;
  }

  // If has course progress, find next incomplete
  if (ctx.session.course) {
    const next = getNextIncompleteLesson(ctx.session.course.completedLessons);
    if (!next) {
      await ctx.reply("🎉 Congratulations! You've completed the entire course! Use /course to review.");
      return;
    }
    await startLesson(ctx, next.id);
    return;
  }

  // First time — start from beginning
  await startLesson(ctx, getFirstLessonId());
});

// Continue button — advance through explain → example → exam_tip
composer.callbackQuery("lesson_continue", async (ctx) => {
  await ctx.answerCallbackQuery();

  const lesson = ctx.session.activeLesson;
  if (!lesson) {
    await ctx.reply("No active lesson. Use /learn to start.");
    return;
  }

  const lessonCtx = getLessonContext(lesson.lessonId);
  if (!lessonCtx) return;

  const header = formatLessonHeader(lesson.lessonId);

  if (lesson.step === "explain") {
    await ctx.reply("⏳ Loading example...");
    const example = await generateLessonExample(lessonCtx.lesson, lessonCtx.domain);
    lesson.step = "example";

    const keyboard = new InlineKeyboard().text("▶️ See Exam Tips", "lesson_continue");
    await ctx.reply(`${header}\n\n💡 Real-World Example:\n\n${example}`, {
      reply_markup: keyboard,
    });
  } else if (lesson.step === "example") {
    await ctx.reply("⏳ Loading exam tips...");
    const tip = await generateExamTip(lessonCtx.lesson, lessonCtx.domain);
    lesson.step = "exam_tip";

    const keyboard = new InlineKeyboard().text("🧪 Start Quiz", "lesson_start_quiz");
    await ctx.reply(`${header}\n\n⚠️ Exam Tips:\n\n${tip}`, {
      reply_markup: keyboard,
    });
  }
});

// Start the mini quiz
composer.callbackQuery("lesson_start_quiz", async (ctx) => {
  await ctx.answerCallbackQuery();

  const lesson = ctx.session.activeLesson;
  if (!lesson) {
    await ctx.reply("No active lesson. Use /learn to start.");
    return;
  }

  const lessonCtx = getLessonContext(lesson.lessonId);
  if (!lessonCtx) return;

  await ctx.reply("⏳ Generating quiz questions...");

  const questionCount = lesson.masteryFailed ? 1 : 2;
  const questions = await generateLessonQuiz(lessonCtx.lesson, questionCount);

  lesson.step = "quiz";
  lesson.quizState = {
    questions,
    currentQuestionIndex: 0,
    correctCount: 0,
  };

  await sendQuizQuestion(ctx);
});

async function sendQuizQuestion(ctx: BotContext): Promise<void> {
  const lesson = ctx.session.activeLesson;
  if (!lesson?.quizState) return;

  const { questions, currentQuestionIndex } = lesson.quizState;
  const q = questions[currentQuestionIndex];
  const header = formatLessonHeader(lesson.lessonId);
  const qNum = currentQuestionIndex + 1;
  const qTotal = questions.length;

  let text = `${header}\n\n🧪 Quiz (${qNum}/${qTotal}):\n\n${q.question}\n\n`;
  text += q.options.map((opt, i) => `${opt}`).join("\n");

  const keyboard = new InlineKeyboard();
  keyboard.text("A", "lesson_answer_0").text("B", "lesson_answer_1");
  keyboard.row();
  keyboard.text("C", "lesson_answer_2").text("D", "lesson_answer_3");

  await ctx.reply(text, { reply_markup: keyboard });
}

// Handle quiz answers
composer.callbackQuery(/^lesson_answer_(\d)$/, async (ctx) => {
  await ctx.answerCallbackQuery();

  const lesson = ctx.session.activeLesson;
  if (!lesson?.quizState) {
    await ctx.reply("No active quiz. Use /learn to start a lesson.");
    return;
  }

  const chosenIndex = parseInt(ctx.match[1], 10);
  const { questions, currentQuestionIndex } = lesson.quizState;
  const q = questions[currentQuestionIndex];

  // Remove the keyboard
  try {
    await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } });
  } catch {}

  const isCorrect = chosenIndex === q.correctIndex;

  if (isCorrect) {
    lesson.quizState.correctCount++;
    await ctx.reply(`✅ Correct!\n\n${q.explanation}`);
  } else {
    await ctx.reply(
      `❌ Incorrect. You chose: ${q.options[chosenIndex]}\n\n` +
        `Correct answer: ${q.options[q.correctIndex]}\n\n${q.explanation}`
    );
  }

  lesson.quizState.currentQuestionIndex++;

  // More questions?
  if (lesson.quizState.currentQuestionIndex < questions.length) {
    await sendQuizQuestion(ctx);
    return;
  }

  // Quiz done — mastery check
  const { correctCount } = lesson.quizState;
  const total = questions.length;
  const passed = correctCount >= Math.ceil(total / 2);

  if (passed || lesson.masteryFailed) {
    // Pass (or auto-pass on retry)
    await markLessonComplete(ctx);
  } else {
    // Failed first attempt
    lesson.masteryFailed = true;
    const keyboard = new InlineKeyboard().text("📖 Review & Retry", "lesson_retry");
    await ctx.reply(
      `📊 Quiz Result: ${correctCount}/${total}\n\n` +
        `You need a bit more practice on this one. Let me re-explain it more simply.`,
      { reply_markup: keyboard }
    );
  }
});

// Retry after failure — simplified explanation + 1 retry question
composer.callbackQuery("lesson_retry", async (ctx) => {
  await ctx.answerCallbackQuery();

  const lesson = ctx.session.activeLesson;
  if (!lesson) {
    await ctx.reply("No active lesson. Use /learn to start.");
    return;
  }

  const lessonCtx = getLessonContext(lesson.lessonId);
  if (!lessonCtx) return;

  await ctx.reply("⏳ Preparing simplified review...");

  // Collect wrong topics from the quiz
  const wrongTopics: string[] = [];
  if (lesson.quizState) {
    for (let i = 0; i < lesson.quizState.questions.length; i++) {
      const q = lesson.quizState.questions[i];
      wrongTopics.push(q.topic || q.question.substring(0, 80));
    }
  }

  const simplified = await generateSimplifiedExplanation(lessonCtx.lesson, wrongTopics);
  const header = formatLessonHeader(lesson.lessonId);

  const keyboard = new InlineKeyboard().text("🧪 Retry Quiz", "lesson_start_quiz");
  await ctx.reply(`${header}\n\n📖 Simplified Review:\n\n${simplified}`, {
    reply_markup: keyboard,
  });
});

async function markLessonComplete(ctx: BotContext): Promise<void> {
  const lesson = ctx.session.activeLesson;
  if (!lesson || !ctx.session.course) return;

  const { quizState, lessonId } = lesson;
  const correctCount = quizState?.correctCount || 0;
  const totalQuestions = quizState?.questions.length || 0;

  // Record completion
  if (!ctx.session.course.completedLessons.includes(lessonId)) {
    ctx.session.course.completedLessons.push(lessonId);
  }
  ctx.session.course.scores[lessonId] = { correct: correctCount, total: totalQuestions };

  // Clear active lesson
  ctx.session.activeLesson = null;

  // Find next lesson
  const next = getNextLesson(lessonId);

  const keyboard = new InlineKeyboard();
  if (next) {
    ctx.session.course.currentLessonId = next.id;
    keyboard.text("▶️ Next Lesson", "lesson_next");
    keyboard.text("📚 Course Overview", "lesson_back_to_course");
  } else {
    keyboard.text("📚 Course Overview", "lesson_back_to_course");
  }

  const emoji = lesson.masteryFailed ? "📊" : "🎯";
  await ctx.reply(
    `${emoji} Lesson Complete! Score: ${correctCount}/${totalQuestions}\n\n` +
      (next
        ? `Next up: Lesson ${next.id}: ${next.title}`
        : "🎉 You've completed the entire course! Amazing work!"),
    { reply_markup: keyboard }
  );
}

// Next lesson button
composer.callbackQuery("lesson_next", async (ctx) => {
  await ctx.answerCallbackQuery();

  if (!ctx.session.course) {
    await ctx.reply("Use /learn to start the course.");
    return;
  }

  const lessonId = ctx.session.course.currentLessonId;
  await startLesson(ctx, lessonId);
});

// Back to course overview — compact summary
composer.callbackQuery("lesson_back_to_course", async (ctx) => {
  await ctx.answerCallbackQuery();

  const { DVA_C02_COURSE } = await import("../../data/dva-c02-course");
  const { getTotalLessonCount } = await import("../../data/course-helpers");

  const course = DVA_C02_COURSE;
  const completed = ctx.session.course?.completedLessons || [];
  const total = getTotalLessonCount();
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  let text = `📚 AWS ${course.examCode} Course\n`;
  text += `Progress: ${completed.length}/${total} lessons (${pct}%)\n\n`;

  for (const domain of course.domains) {
    const domainLessons = domain.tasks.flatMap((t) => t.lessons);
    const domainDone = domainLessons.filter((l) => completed.includes(l.id)).length;
    const domainTotal = domainLessons.length;
    const bar = domainDone === domainTotal ? "✅" : `${domainDone}/${domainTotal}`;
    text += `📘 Module ${domain.id}: ${domain.title}\n`;
    text += `   ${bar} lessons | ${domain.weight}% of exam\n\n`;
  }

  text += "Use /module 1-4 to see lessons in each module.";

  const keyboard = new InlineKeyboard();
  if (completed.length < total) {
    keyboard.text("▶️ Continue Learning", "course_start");
  }

  await ctx.reply(text, { reply_markup: keyboard });
});

export default composer;
