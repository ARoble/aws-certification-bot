import { QuizQuestion } from "./quiz";

// Course tree structure
export interface Lesson {
  id: string;
  title: string;
  skills: string[];
}

export interface Task {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Domain {
  id: number;
  title: string;
  weight: number;
  tasks: Task[];
}

export interface CourseTree {
  examCode: string;
  domains: Domain[];
}

// Lesson flow state machine
export type LessonStep = "explain" | "example" | "exam_tip" | "quiz" | "mastery";

export interface LessonQuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  correctCount: number;
}

export interface LessonState {
  domainId: number;
  taskId: string;
  lessonId: string;
  step: LessonStep;
  quizState: LessonQuizState | null;
  masteryFailed: boolean;
  awaitingQuestion?: boolean;
}

// Long-term progress
export interface CourseProgress {
  currentLessonId: string;
  completedLessons: string[];
  scores: Record<string, { correct: number; total: number }>;
}
