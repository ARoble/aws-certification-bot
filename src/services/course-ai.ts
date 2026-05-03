import OpenAI from "openai";
import { config } from "../config";
import { QuizQuestion, Lesson, Domain } from "../types";

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function generateLessonExplanation(
  lesson: Lesson,
  domain: Domain
): Promise<string> {
  const skillsList = lesson.skills.map((s) => `- ${s}`).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AWS instructor preparing a student for the DVA-C02 exam.
Explain the following lesson in 5-8 concise bullet points. Focus on what actually appears on the exam.
Use plain text with dashes (-) for bullets. No markdown formatting. No asterisks, no bold, no headers.
Start each bullet with a dash and a space.`,
      },
      {
        role: "user",
        content: `Domain: ${domain.title}\nLesson: ${lesson.title}\n\nSkills to cover:\n${skillsList}`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate explanation.";
}

export async function generateLessonExample(
  lesson: Lesson,
  domain: Domain
): Promise<string> {
  const skillsList = lesson.skills.map((s) => `- ${s}`).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AWS instructor. Give a real-world AWS use case that demonstrates these concepts.
Be specific with service names, configurations, and architecture decisions.
Under 200 words. Plain text only. No markdown formatting. No asterisks, no bold, no headers.`,
      },
      {
        role: "user",
        content: `Domain: ${domain.title}\nLesson: ${lesson.title}\n\nSkills:\n${skillsList}`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate example.";
}

export async function generateExamTip(
  lesson: Lesson,
  domain: Domain
): Promise<string> {
  const skillsList = lesson.skills.map((s) => `- ${s}`).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a DVA-C02 exam coach. What trick questions or common traps does AWS use for these topics?
Give 2-3 specific, actionable tips. Under 150 words. Plain text only. No markdown. No asterisks, no bold, no headers.`,
      },
      {
        role: "user",
        content: `Domain: ${domain.title}\nLesson: ${lesson.title}\n\nTopics:\n${skillsList}`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate exam tips.";
}

export async function generateLessonQuiz(
  lesson: Lesson,
  count: number
): Promise<QuizQuestion[]> {
  const skillsList = lesson.skills.map((s) => `- ${s}`).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an AWS DVA-C02 exam question writer.
Generate exactly ${count} multiple-choice question(s) covering the lesson skills below.
Each question must have exactly 4 options (A-D).
Return JSON with this exact shape:
{
  "questions": [
    {
      "question": "the question text",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "explanation": "concise explanation",
      "topic": "the specific AWS topic"
    }
  ]
}
Questions should be at exam difficulty level.
IMPORTANT: Do NOT use markdown in any field. Plain text only.`,
      },
      {
        role: "user",
        content: `Lesson: ${lesson.title}\n\nSkills:\n${skillsList}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");

  const parsed = JSON.parse(content) as { questions: QuizQuestion[] };

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error("Invalid quiz format from OpenAI");
  }

  for (const q of parsed.questions) {
    if (
      !q.question ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.correctIndex !== "number" ||
      !q.explanation
    ) {
      throw new Error("Invalid question format from OpenAI");
    }
  }

  return parsed.questions;
}

export async function answerLessonQuestion(
  lesson: Lesson,
  domain: Domain,
  question: string
): Promise<string> {
  const skillsList = lesson.skills.map((s) => `- ${s}`).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AWS instructor helping a student who is confused about a concept in a lesson.
Answer their specific question clearly and concisely. Relate your answer back to the lesson topic.
Under 200 words. Plain text only. No markdown formatting. No asterisks, no bold, no headers.`,
      },
      {
        role: "user",
        content: `Domain: ${domain.title}\nLesson: ${lesson.title}\n\nSkills being taught:\n${skillsList}\n\nStudent's question: ${question}`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate an answer. Try rephrasing your question.";
}

export async function generateSimplifiedExplanation(
  lesson: Lesson,
  wrongTopics: string[]
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AWS instructor. The student struggled with this lesson.
Re-explain the concepts more simply, focusing on what they got wrong. Use analogies and simple language.
Under 200 words. Plain text only. No markdown. No asterisks, no bold, no headers.`,
      },
      {
        role: "user",
        content: `Lesson: ${lesson.title}\n\nThe student got these wrong:\n${wrongTopics.map((t) => `- ${t}`).join("\n")}\n\nPlease re-explain simply.`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate explanation.";
}
