# AuraCalmer.AI 🌟

An empathetic, AI-powered digital companion designed specifically for students to manage academic stress. Built with Next.js App Router, Tailwind CSS, and the Gemini API, AuraCalmer provides a safe space for journaling, cognitive reframing, and supportive real-time conversations.

## 🚀 Features

- **The Journal & Mood Log**: A distraction-free environment to pour out your thoughts. Log your current mood and let Aura unpack your entry to detect specific stress triggers and provide actionable coping mechanisms.
- **The Companion Chat**: A highly responsive, streaming chat interface serving as your personal, non-judgmental digital companion when the academic pressure builds up.
- **Insights Dashboard**: Visualize your recent emotional well-being metrics at a glance through sleek UI cards.
- **Accessible & Tested**: Full ARIA-compliant labeling across all components and strict Unit Testing coverage using Vitest.
- **Premium UI/UX**: State-of-the-art glassmorphic design utilizing `framer-motion` for fluid micro-interactions and `lucide-react` for iconography.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui inspired design
- **Animations**: Framer Motion
- **AI Integration**: Vercel AI SDK + Google Generative AI (Gemini 2.5 Flash)
- **Testing**: Vitest + React Testing Library + JSDOM

## ⚙️ Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and npm installed on your machine.

### 1. Clone & Install

```bash
git clone https://github.com/your-username/auracalmer-ai.git
cd auracalmer-ai
npm install
```

### 2. Set Up Environment Variables

Rename the provided `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Next, open `.env.local` and add your Gemini API Key:

```env
GEMINI_API_KEY="your_api_key_here"
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the app.

## 🧪 Testing

We use **Vitest** for running our automated unit tests (UTs). To run the test suite:

```bash
npm run test
```

## 🤝 Contribution Guidelines

- Code should strictly follow our TypeScript and accessibility criteria (ensure components use semantic HTML and proper `aria-labels`).
- Use Tailwind for styling and adhere to the project's modern, dark-mode aesthetic.

---
*Built with ❤️ for PromptWars.*
