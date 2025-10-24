# Pokemon Guessing Game

A Wordle-style Pokemon guessing game built with React, TypeScript, Tailwind CSS, and Shadcn/ui.

## 🚀 Quick Start

### Install Dependencies
```bash
bun install
```

### Development Server
```bash
bun run dev
```
Opens at `http://localhost:3000` with Vite

### Production Build
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

## 🛠️ Tech Stack

- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager
- **[Vite](https://vite.dev/)** - Next-generation frontend tooling
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Shadcn/ui](https://ui.shadcn.com/)** - Re-usable components
- **[PokéAPI](https://pokeapi.co/)** - Pokemon data

## 📚 Documentation

- [Vite Setup Guide](./VITE_SETUP.md) - Vite configuration and usage
- [Agents Best Practices](./AGENTS.md) - React, Shadcn, and Tailwind best practices

## 🎮 Game Features

- **Wordle-style Gameplay**: Guess Pokemon names with color-coded feedback
- **Generation Selector**: Choose from 9 Pokemon generations
- **Progressive Image Reveal**: Image becomes clearer with each attempt
- **5 Attempts**: Limited guesses for challenge
- **French Localization**: All Pokemon names in French
- **Responsive Design**: Works on mobile and desktop

## 🏗️ Project Structure

```
pokemon-guessing/
├── src/
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── data/             # Pokemon generation data
│   ├── types/            # TypeScript types
│   └── lib/              # Utility functions
├── styles/               # Global styles
├── index.html           # Entry HTML
└── vite.config.ts       # Vite configuration
```
