# SoftSell - Monetize Your Unused Software Licenses

A responsive, single-page marketing website concept for SoftSell, a fictional software resale startup. This project demonstrates rapid product development with clean code and (hopefully!) good design.

**Live Demo:** ["https://soft-shell-alpha.vercel.app/"] *(Go on, click it. It doesn't bite... much.)*

## Core Features

*   **Main Sections:** Hero (with animated stats!), Trust Signals (because why not?), How It Works, Why Choose Us, Testimonials, FAQ (for all your burning questions), and a Contact Form (with a fun little estimated value calculator).
*   **UI/UX:**
    *   Modern, responsive design using Tailwind CSS and the lovely "Inter" font.
    *   User-toggleable Light/Dark Mode (defaults to dark, because real devs code in the dark). Preference saved!
    *   Subtle animations via Framer Motion for that *chef's kiss* user experience.
    *   Smooth scrolling and a sticky, mobile-friendly Navbar that won't abandon you.
*   **Bonus Highlights (The "Show Off" Section):**
    *   **LLM-Powered Chat (Groq API - Llama 3):** A friendly AI assistant for SoftSell queries. It's surprisingly smart for something I built!
    *   **Branding:** Custom logo and favicon. Look Ma, I'm a designer! (Sort of).
    *   **SEO:** Basic meta tags and Open Graph tags, so Google might actually find us.
    *   **Cookie Consent Banner:** Because privacy is important, and so is avoiding lawsuits.
*   **Tech Stack:** React.js + Vite, Tailwind CSS (v3), Framer Motion, React Icons.

## Design & Development Notes

*   **Approach:** A component-based architecture was used for modularity (and to keep my sanity). The design prioritizes a clean, professional aesthetic with an emerald green accent.
*   **Tooling:** Vite for a speedy development environment and Tailwind CSS for efficient styling. Framer Motion adds a touch of class with animations.
*   **LLM/v0.dev Assistance:** AI tools like [Vercel's v0.dev](https://v0.dev) and other LLMs were consulted for initial UI scaffolding and styling patterns – like having a very patient, code-savvy rubber duck. Core logic and final implementation are original.
*   **Process:** Development was iterative. The Git commit history is a testament to the journey, complete with feature additions, styling tweaks, and the occasional "oops, fixed that" bug squashing.

## Environment Variables

For the LLM chat feature to actually chat back:
1.  Create a root `.env` file (if it's not there, the chatbot will be very, very quiet).
2.  Add: `VITE_GROQ_API_KEY=your_super_secret_groq_api_key_here`
    *(Note: `.env` is properly gitignored. No API keys were harmed (or leaked) in the making of this project).*

## Getting Started

1.  **Clone:** `git clone https://github.com/Vishwa1011-AFK/SoftSell`
2.  **Install Node Modules Monster:** `npm install`
3.  **Set up `.env` (see above, it's important!).**
4.  **Ignite Dev Server:** `npm run dev` (App usually at `http://localhost:5173`)
5.  **Build for World Domination (Production):** `npm run build`

## (Estimated) Time Spent

Approximately **25-35 hours**. This includes coding, styling, debugging (aka "Why isn't this working?!"), and existential contemplation about flexbox.

## Potential Future Enhancements (The "If I Had a Magic Wand" List)

*   Active navbar link styling (because details matter).
*   Backend integration for the contact form (so it actually goes somewhere).
*   Expanded test coverage (to prove it *really* works).
*   Teach the chatbot to tell jokes.

---
This project demonstrates a practical application of modern frontend technologies to build a feature-rich web application. Feel free to explore the code and the live demo!
