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

## 🧪 Testing

### Run Tests
```bash
bun test
```

### Watch Mode
```bash
bun test:watch
```

### Coverage
```bash
bun test --coverage
```

The project includes comprehensive tests:
- ✅ **125 tests** across 7 test files
- ✅ **Component snapshot tests** (GameOver, PokemonImage, PokemonInfos, etc.)
- ✅ **Custom hook tests** (usePokemonGame with mode switching)
- ✅ **217 expect() calls** ensuring functionality
- ✅ **28 snapshots** for UI regression testing

## 🚀 Deployment

Deploy to [Netlify](https://netlify.com) with automatic testing:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

The project is configured to:
1. ✅ Run all tests before build
2. ✅ Fail deployment if tests fail
3. ✅ Auto-deploy on Git push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Netlify deployment with automatic testing
- [Agents Best Practices](./AGENTS.md) - React, Shadcn, and Tailwind best practices

## 🎮 Game Features

- **Wordle-style Gameplay**: Guess Pokemon names with color-coded feedback
- **Two Game Modes**: 
  - 🌫️ **Blur Mode**: Image progressively unblurs with each guess
  - 🔍 **Zoom Mode**: Image progressively zooms out from close-up
- **Side Menu**: Hamburger menu with game settings and info
- **Generation Selector**: Choose from 9 Pokemon generations (Gen I to Gen IX)
- **5 Attempts**: Limited guesses for challenge
- **French Localization**: All Pokemon names in French
- **Accent-Insensitive**: Type without accents (e.g., "evoli" matches "évoli")
- **Responsive Design**: Optimized for mobile and desktop
- **Auto-Focus Input**: Keyboard-friendly gameplay

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
