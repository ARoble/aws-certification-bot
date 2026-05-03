import { Context, SessionFlavor } from "grammy";
import { QuizState } from "./quiz";
import { LessonState, CourseProgress } from "./course";

export interface SessionData {
  quiz: QuizState;
  course: CourseProgress | null;
  activeLesson: LessonState | null;
}

export type BotContext = Context & SessionFlavor<SessionData>;
