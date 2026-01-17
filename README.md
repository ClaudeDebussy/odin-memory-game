# Memory Card Game - Color Edition

This project is a React-based memory game built as part of [The Odin Project](https://www.theodinproject.com) curriculum. The objective is to test your memory by clicking on unique color cards. If you click a color you’ve already selected, your score resets. To win, you must click all 12 colors exactly once.

---

## Features

- Dynamic Data Fetching: Retrieves color names, HSL values, and contrast-safe text colors from [The Color API](https://www.thecolorapi.com/).

- Score Tracking: Includes a real-time scoreboard for your current score and a "High Score" that persists during your session.

- Shuffle Logic: The cards are randomized using a Fisher-Yates shuffle algorithm every time a card is clicked.

- Responsive UI: Built with a CSS Grid layout that adapts to different screen sizes using clamp() for fluid typography.

- Interactive Design: Cards feature smooth HSL-based transitions, hover states, and active click animations.

---

## Built With

- React: Functional components and Hooks (useState, useEffect).

- CSS3: Custom properties, Flexbox, and CSS Grid.

- The Color API: External REST API for generating color data.

- Vite: Frontend tooling for a fast development experience.

---

## How to Play

1. Start: When the app loads, 12 random colors are fetched and displayed.

2. Click: Click any color card to gain a point.

3. Remember: After every click, the board shuffles.

4. Avoid Duplicates: Do not click the same color twice! If you do, your current score resets to zero.

5. Win: Successfully click all 12 unique colors to win the game.

---

## Project Structure

```
src/
├── components/
│   ├── Card.jsx      # Individual color card with internal hover states
│   └── Header.jsx    # Displays scores and the "New Game" button
├── styles/
│   ├── card.css      # Card-specific layout and transitions
│   ├── header.css    # Header styling and button animations
│   ├── index.css     # Main layout (Grid) and background
│   └── modern-css-reset.css # Josh Comeau's CSS reset
├── App.jsx           # Main game logic and state management
├── colorService.js   # API fetching and shuffle utilities
└── main.jsx          # Application entry point
```

---

## Setup and Installation

1. Clone the repository:
   `git clone https://github.com/your-username/memory-card.git`

2. Install dependencies:
   `npm install`

3. Run the development server:
   `npm run dev`

---

## Assignment Requirements Met

- [x] Use functional components and hooks (`useState`, `useEffect`).

- [x] Fetch data from an external API.

- [x] Implement a scoreboard and high score.

- [x] Shuffle cards on every click and initial mount.
