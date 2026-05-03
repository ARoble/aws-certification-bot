import { Composer, InlineKeyboard } from "grammy";
import { BotContext } from "../../types";
import { DVA_C02_COURSE } from "../../data/dva-c02-course";
import {
  getTotalLessonCount,
  getDomain,
  getFirstIncompleteLessonInDomain,
  getFirstLessonId,
} from "../../data/course-helpers";

const composer = new Composer<BotContext>();

composer.command("course", (ctx) => {
  const course = DVA_C02_COURSE;
  const completed = ctx.session.course?.completedLessons || [];
  const total = getTotalLessonCount();
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  let text = `📚 AWS ${course.examCode} Course Outline\n`;
  text += `Progress: ${completed.length}/${total} lessons (${pct}%)\n\n`;

  for (const domain of course.domains) {
    text += `📘 Module ${domain.id}: ${domain.title} (${domain.weight}%)\n`;
    for (const task of domain.tasks) {
      for (const lesson of task.lessons) {
        const check = completed.includes(lesson.id) ? "✅" : "⬜";
        text += `  ${check} ${lesson.id} ${lesson.title}\n`;
      }
    }
    text += "\n";
  }

  const keyboard = new InlineKeyboard();
  if (completed.length === 0) {
    keyboard.text("🚀 Start Learning", "course_start");
  } else if (completed.length < total) {
    keyboard.text("▶️ Continue Learning", "course_start");
  } else {
    keyboard.text("🔄 Review from Start", "course_start");
  }

  return ctx.reply(text, { reply_markup: keyboard });
});

composer.command("module", (ctx) => {
  const arg = ctx.match?.trim();
  const domainId = parseInt(arg || "", 10);

  if (!domainId || domainId < 1 || domainId > 4) {
    return ctx.reply("Usage: /module 1 (or 2, 3, 4)\n\nModules:\n1 - Development with AWS Services\n2 - Security\n3 - Deployment\n4 - Troubleshooting and Optimization");
  }

  const domain = getDomain(domainId);
  if (!domain) return ctx.reply("Module not found.");

  const completed = ctx.session.course?.completedLessons || [];

  let text = `📘 Module ${domain.id}: ${domain.title} (${domain.weight}%)\n\n`;

  for (const task of domain.tasks) {
    text += `${task.id} ${task.title}\n`;
    for (const lesson of task.lessons) {
      const check = completed.includes(lesson.id) ? "✅" : "⬜";
      text += `  ${check} ${lesson.id} ${lesson.title}\n`;
    }
    text += "\n";
  }

  const domainLessons = domain.tasks.flatMap((t) => t.lessons);
  const domainCompleted = domainLessons.filter((l) => completed.includes(l.id)).length;
  text += `Progress: ${domainCompleted}/${domainLessons.length} lessons`;

  const keyboard = new InlineKeyboard();
  keyboard.text(`▶️ Start Module ${domainId}`, `module_start_${domainId}`);

  return ctx.reply(text, { reply_markup: keyboard });
});

composer.callbackQuery("course_start", async (ctx) => {
  await ctx.answerCallbackQuery();

  if (!ctx.session.course) {
    ctx.session.course = {
      currentLessonId: getFirstLessonId(),
      completedLessons: [],
      scores: {},
    };
  }

  const { startLesson } = await import("./lesson");
  const nextLessonId = ctx.session.course.currentLessonId;
  await startLesson(ctx, nextLessonId);
});

composer.callbackQuery(/^module_start_(\d)$/, async (ctx) => {
  await ctx.answerCallbackQuery();

  const domainId = parseInt(ctx.match[1], 10);

  if (!ctx.session.course) {
    ctx.session.course = {
      currentLessonId: getFirstLessonId(),
      completedLessons: [],
      scores: {},
    };
  }

  const nextLesson = getFirstIncompleteLessonInDomain(
    domainId,
    ctx.session.course.completedLessons
  );

  if (!nextLesson) {
    return ctx.reply("🎉 You've completed all lessons in this module!");
  }

  ctx.session.course.currentLessonId = nextLesson.id;
  const { startLesson } = await import("./lesson");
  await startLesson(ctx, nextLesson.id);
});

export default composer;
