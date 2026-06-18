# 🚀 Muhammad Usman Bari | Interactive Personal Portfolio

Welcome to the source ledger for my personal portfolio portal. This is a premium, high-fidelity web application built in React, TypeScript, and Tailwind CSS. It highlights my academic journey as a Computer Science student at FAST NUCES Islamabad, my specialization in Artificial Intelligence & Machine Learning, and my professional project credentials.

🔗 **Live Portal:** [usmanbari-portfolio.netlify.app](https://usmanbari-portfolio.netlify.app/)  
🔗 **LinkedIn:** [linkedin.com/in/usman-bari-0b6806279](https://www.linkedin.com/in/usman-bari-0b6806279/)

---

## 🎨 Premium Visual & Interactive Features

This portfolio is packed with interactive details designed to provide a state-of-the-art user experience:

*   **🤖 Robot Emoji Favicon (`🤖`) & Clean Tab Title**: Optimized for browsers with a dynamic inline SVG robot favicon.
*   **✨ Particle Attraction Backdrop**: A 3D monochrome starfield canvas that tracks your absolute mouse coordinates and dynamically pulls stars toward the cursor wake using physics equations.
*   **💫 Trailing Cursor physics aura**: A responsive white pointer dot accompanied by an outer trailing ring built with custom spring physics that expands and highlights when hovering over links and buttons.
*   **🎭 Smooth Role Subheading Cycling**: Subheading text in the hero section cycles smoothly using slide-up, blur, and opacity transitions on a custom easing curve.
*   **🔮 3D Hover Card Tilt & Laser Spotlight**: Project timeline cards rotate on the X and Y axes depending on mouse position, overlaying a trailing radial spotlight flare bounded by the card's client rect.
*   **💬 Ask Usman AI Assistant (Groq / Llama 3)**: A floating chatbot agent that parses markdown, streams responses, and automatically attaches matching reference cards (with GitHub and live demo links) when relevant projects are mentioned.
*   **⚡ Persistent Quick Action Chips**: Horizontally scrollable prompt chips placed above the chat input field, allowing visitors to instantly ask common questions.
*   **🌌 Lenis Smooth Scroll**: Full integration of smooth scrolling physics for seamless navigation.

---

## 🛠️ Tech Stack

*   **Core**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Animations & Physics**: Framer Motion (motion/react), Canvas 2D API
*   **Scroll Mechanics**: Lenis React
*   **AI Integration**: Groq API (`llama-3.3-70b-versatile` model)
*   **Icons**: Lucide React

---

## 📦 Project Timeline Matrix

The portfolio showcases a chronological list of built systems:

1.  **Enterprise RAG Knowledge Assistant** - Multi-document PDF indexing and context-aware QA vector pipeline.
2.  **QueryMind** - Natural language query generator to SQL translator and automated database ERD schema drawer.
3.  **Intelligent Reading Comprehension System** - NLP semantic document parser and linguistic heuristic extractor.
4.  **Socially Android App** - Full-stack client featuring Agora audio/video calls and offline-first SQLite sync.
5.  **Gemini AI Chatbot** - Web conversation client integrating Google Gemini API.
6.  **Xonix Game** - SFML arcade game implementing graph traversal and custom DSA logic.
7.  **Game Boy Console Clone** - OOP emulator implementing mini games (Wordle, Snake, Hangman).

---

## 🚀 Run Locally

### Prerequisites
*   Node.js (v18 or higher)
*   npm (v9 or higher)

### Setup Steps
1.  Clone the repository:
    ```bash
    git clone https://github.com/UsmanBari/My-Portfolio.git
    cd My-Portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure your environment variables. Create a `.env` file in the root folder:
    ```env
    VITE_GROQ_API_KEY="your_groq_api_key_here"
    ```

4.  Launch the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:3000`.

---

## 🌐 Deploy to Netlify

To deploy this site on Netlify and keep your Groq API key secure:

1.  Import your repository `UsmanBari/My-Portfolio` into Netlify.
2.  Set the build command to `npm run build` and the publish directory to `dist`.
3.  Go to **Site configuration** -> **Environment variables** in Netlify.
4.  Add a new single variable:
    *   **Key**: `VITE_GROQ_API_KEY`
    *   **Value**: *[Your Groq API Key]*
5.  Trigger a new deploy to apply the environment configurations.
