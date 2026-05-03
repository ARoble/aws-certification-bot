import OpenAI from "openai";
import { config } from "../config";
import { QuizQuestion } from "../types";

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function generateQuizQuestion(
  topic?: string
): Promise<QuizQuestion> {
  const topicInstruction = topic
    ? `The question MUST be about "${topic}".`
    : "Pick a random DVA-C02 exam domain (e.g. Lambda, DynamoDB, API Gateway, S3, SQS, SNS, CloudFormation, IAM, CodeDeploy, X-Ray, etc.).";

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an AWS Certified Developer Associate (DVA-C02) exam question writer.
Generate ONE multiple-choice question with exactly 4 options (A-D).
${topicInstruction}
Return JSON with this exact shape:
{
  "question": "the question text",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correctIndex": 0,
  "explanation": "concise explanation of why the correct answer is right",
  "topic": "the AWS topic"
}
The question should be at exam difficulty level. The explanation should teach the concept clearly.
IMPORTANT: Do NOT use markdown formatting. Use plain text only. No asterisks, no bold, no headers.`,
      },
      {
        role: "user",
        content: "Generate a DVA-C02 practice question.",
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  const parsed = JSON.parse(content) as QuizQuestion;

  if (
    !parsed.question ||
    !Array.isArray(parsed.options) ||
    parsed.options.length !== 4 ||
    typeof parsed.correctIndex !== "number" ||
    !parsed.explanation
  ) {
    throw new Error("Invalid quiz question format from OpenAI");
  }

  return parsed;
}

export async function explainWrongAnswer(
  question: QuizQuestion,
  chosenIndex: number
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AWS instructor helping a student prepare for the DVA-C02 exam.
The student answered a question incorrectly. Explain why their choice is wrong and teach the correct concept.
Be concise (under 200 words). Use a friendly, encouraging tone.
IMPORTANT: Do NOT use markdown formatting. Use plain text only. No asterisks, no bold, no headers. Use dashes (-) for bullet points if needed.`,
      },
      {
        role: "user",
        content: `Question: ${question.question}

My answer: ${question.options[chosenIndex]}
Correct answer: ${question.options[question.correctIndex]}

Why was I wrong?`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate explanation.";
}

export async function explainTopic(topic: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AWS instructor helping a student prepare for the DVA-C02 exam.
Explain the requested topic clearly and concisely. Cover:
- What it is and when to use it
- Key features relevant to the DVA-C02 exam
- Common exam gotchas or tricky points
Keep it under 300 words. Use dashes (-) for bullet points.
IMPORTANT: Do NOT use markdown formatting. Use plain text only. No asterisks, no bold, no headers.`,
      },
      {
        role: "user",
        content: `Explain: ${topic}`,
      },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate explanation.";
}
