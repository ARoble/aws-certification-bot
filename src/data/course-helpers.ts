import { Domain, Task, Lesson } from "../types/course";
import { DVA_C02_COURSE } from "./dva-c02-course";

const course = DVA_C02_COURSE;

export function getDomain(domainId: number): Domain | undefined {
  return course.domains.find((d) => d.id === domainId);
}

export function getTask(taskId: string): Task | undefined {
  for (const domain of course.domains) {
    const task = domain.tasks.find((t) => t.id === taskId);
    if (task) return task;
  }
  return undefined;
}

export function getLesson(lessonId: string): Lesson | undefined {
  for (const domain of course.domains) {
    for (const task of domain.tasks) {
      const lesson = task.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return undefined;
}

export interface LessonContext {
  domain: Domain;
  task: Task;
  lesson: Lesson;
}

export function getLessonContext(lessonId: string): LessonContext | undefined {
  for (const domain of course.domains) {
    for (const task of domain.tasks) {
      const lesson = task.lessons.find((l) => l.id === lessonId);
      if (lesson) return { domain, task, lesson };
    }
  }
  return undefined;
}

export function getAllLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  for (const domain of course.domains) {
    for (const task of domain.tasks) {
      lessons.push(...task.lessons);
    }
  }
  return lessons;
}

export function getTotalLessonCount(): number {
  return getAllLessons().length;
}

export function getFirstLessonId(): string {
  return course.domains[0].tasks[0].lessons[0].id;
}

export function getNextLesson(currentLessonId: string): Lesson | null {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx === -1 || idx === all.length - 1) return null;
  return all[idx + 1];
}

export function getFirstIncompleteLessonInDomain(
  domainId: number,
  completedLessons: string[]
): Lesson | null {
  const domain = getDomain(domainId);
  if (!domain) return null;
  for (const task of domain.tasks) {
    for (const lesson of task.lessons) {
      if (!completedLessons.includes(lesson.id)) return lesson;
    }
  }
  return null;
}

export function getNextIncompleteLesson(completedLessons: string[]): Lesson | null {
  const all = getAllLessons();
  return all.find((l) => !completedLessons.includes(l.id)) || null;
}

export function formatLessonHeader(lessonId: string): string {
  const ctx = getLessonContext(lessonId);
  if (!ctx) return "Unknown Lesson";
  return (
    `📘 Module ${ctx.domain.id}: ${ctx.domain.title}\n\n` +
    `Lesson ${ctx.lesson.id}: ${ctx.lesson.title}\n` +
    `━━━━━━━━━━━━━━━━━━━━━`
  );
}
