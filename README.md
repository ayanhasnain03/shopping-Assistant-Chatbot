# AI Shopping Assistant Chatbot

This project is a full-stack AI-powered shopping assistant for an e-commerce experience. It features a modern Next.js frontend and an Express.js backend that leverages OpenAI to provide smart, conversational product recommendations based on real-time product data.

## Features
- **Conversational AI**: Ask for products by category, price, or preference and get tailored recommendations.
- **Modern UI**: Beautiful, responsive frontend built with Next.js, React, and Tailwind CSS.
- **Live Product Data**: Fetches products from [Fake Store API](https://fakestoreapi.com/).
- **OpenAI Integration**: Uses GPT to understand queries and return relevant products in JSON.

---

## Project Structure

```
├── client/   # Next.js 15 (React 19, Tailwind CSS) frontend
├── server/   # Express.js backend (OpenAI integration)
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn/bun)
- OpenAI API key (for backend)

### 1. Clone the repository
```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Setup the Backend (server)
```bash
cd server
cp .env.example .env # Create your .env file (see below)
pnpm install         # or npm/yarn/bun install
pnpm start           # Starts on http://localhost:5000
```

#### Environment Variables
Create a `.env` file in the `server/` directory:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000 # optional, defaults to 5000
```

### 3. Setup the Frontend (client)
```bash
cd client
pnpm install         # or npm/yarn/bun install
pnpm dev             # Starts on http://localhost:3000
```

---

## Usage
1. Start both the backend and frontend servers.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Ask questions like:
   - "Show me electronics under $50"
   - "I want men's clothing"
   - "Find me something for home decor"
4. The AI will respond with matching products and a friendly message.

---

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, TypeScript
- **Backend**: Express.js, OpenAI API, node-fetch, dotenv, CORS
- **APIs**: [Fake Store API](https://fakestoreapi.com/)

---

## License
MIT
