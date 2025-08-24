# Sleeping Dogs Super Hacker - Nuxt 3 Version

A recreation of the Sleeping Dogs camera hacking mini-game (Bulls and Cows variation) built with Nuxt 3, Vue 3, Pinia, and Firebase.

## Tech Stack

- **Nuxt 3** - The Intuitive Vue Framework
- **Vue 3** - Progressive JavaScript Framework
- **Pinia** - State Management
- **SCSS** - CSS Preprocessor
- **Firebase** - Backend as a Service
- **i18n** - Internationalization (English/Russian)

## Features

- 🎮 Interactive Bulls and Cows game mechanics
- 🏆 Leaderboard with Firebase integration
- 🌍 Multi-language support (EN/RU)
- 📱 Responsive design
- ⚡ Server-side rendering with Nuxt 3
- 🎨 Authentic Sleeping Dogs UI design

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Fill in your Firebase configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Game Rules

Guess 4 UNIQUE digits. You have 6 attempts only. And the clock is ticking!

- 🟢 **Green**: Correct digit in correct position
- 🟡 **Yellow**: Correct digit in wrong position  
- 🔴 **Red**: Digit not in the code

## Controls

- **WASD** or **Arrow Keys**: Navigate and change digits
- **Enter**: Submit your guess

## Project Structure

```
├── assets/          # Styles, images, fonts
├── components/      # Vue components
├── composables/     # Vue composables
├── layouts/         # Nuxt layouts
├── pages/           # File-based routing
├── stores/          # Pinia stores
├── utils/           # Utility functions
└── server/          # Server-side code
```

## Migration Status

- ✅ **Phase 1**: Project setup and architecture
- ⏳ **Phase 2**: State management (Pinia stores)
- ⏳ **Phase 3**: Component migration
- ⏳ **Phase 4**: Firebase integration
- ⏳ **Phase 5**: Testing and optimization

## License

This project is for educational purposes. Game concept and assets belong to Square Enix Ltd.

## Original Project

Based on the React version: [sleeping-dogs-super-hacker](https://github.com/s-pyadyshev/sleeping-dogs-super-hacker)