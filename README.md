# AWS DVA-C02 Study Bot

A Telegram bot that acts as a personal AWS Developer Associate (DVA-C02) exam tutor. Built with TypeScript, grammY, and OpenAI.

I built this for myself because I commute a lot and wanted to cover exam topics whether I'm on a train or bus. Figured it might help other people studying for the same cert, so here it is.

## What It Does

This isn't just a quiz bot. It's a structured course that follows the official AWS DVA-C02 exam guide, broken down into 101 lessons across 4 domains:

| Module | Lessons | Exam Weight |
|--------|---------|-------------|
| 1. Development with AWS Services | 29 | 32% |
| 2. Security | 21 | 26% |
| 3. Deployment | 27 | 24% |
| 4. Troubleshooting and Optimization | 24 | 18% |

Each lesson walks you through:

1. **Explanation** - 5-8 exam-focused bullet points
2. **Real-world example** - An actual AWS use case
3. **Exam tips** - What AWS tries to trick you on
4. **Mini quiz** - 1-3 questions to test understanding
5. **Mastery check** - Get it wrong and the bot re-explains it simpler before moving on

The bot tracks your progress and picks up where you left off, so you can do a lesson on your morning commute and continue on the way home.

## Commands

### Course Mode
- `/course` - View the full course outline with your progress
- `/learn` - Start learning or continue where you left off
- `/next` - Skip to the next lesson
- `/module 1` - Jump to a specific module (1-4)

### Quick Practice
- `/quiz` - Random DVA-C02 practice question
- `/quiz Lambda` - Quiz on a specific topic
- `/topic DynamoDB` - Get an explanation of any AWS topic
- `/score` - Check your quiz stats

## Setup

### Prerequisites
- Node.js 18+
- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- An OpenAI API key

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/aws-telegram-bot-backend.git
cd aws-telegram-bot-backend
npm install
```

Copy `.env.example` to `.env` and fill in your keys:

```
BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
```

### Running

```bash
# Development (auto-restarts on changes)
npm run dev

# Production
npm run build
npm start
```

## Tech Stack

- **TypeScript** - Type safety across the codebase
- **grammY** - Telegram Bot API framework
- **OpenAI** (gpt-4o-mini) - Generates lesson content, quizzes, and explanations
- **Express** - Health check endpoint

## How It Works

The course tree is based on the [official AWS DVA-C02 exam guide](https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html). Every skill listed in the exam guide is a lesson in the bot. The lesson content is generated dynamically by OpenAI using detailed prompts that include the specific AWS services and concepts the exam tests on.

Session state is stored in memory, so progress resets if the bot restarts. Good enough for personal use.

## License

MIT
