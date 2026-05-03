export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface QuizState {
  activeQuestion: QuizQuestion | null;
  score: number;
  totalAnswered: number;
}
