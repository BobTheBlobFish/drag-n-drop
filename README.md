# React Flow Block Editor

This project is a React Flow-based block editor built with Next.js and TypeScript. Users can drag and drop predefined blocks onto a canvas, connect them with specific rules, and use undo/redo functionality for both blocks and connections.

---

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BobTheBlobFish/drag-n-drop.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

---

## How to Run the App

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## Summary of the Solution

- **Block Panel:**
  - Displays draggable blocks (Block A, Block B) from a static JSON.
  - Includes Undo and Redo buttons for block and connection actions.
- **Canvas Area:**
  - Users can drag blocks from the panel and drop them onto the canvas.
  - Blocks can be connected, but only from Block A to Block B.
  - Right-clicking a block opens a custom context menu with "Hello World" and a delete option.
- **Undo/Redo:**
  - Tracks creation, deletion, and movement of blocks, as well as connections.
  - Only updates history on meaningful actions (create, delete, drag end, connect/disconnect).

---

## Notes on Design Decisions

- **React Flow** is used for robust node/edge management and visual editing.
- **State and History:**
  - All block and connection changes are managed in a single state object for reliable undo/redo.
  - History is only updated on significant user actions to avoid excessive history entries.
- **Context Menu:**
  - Custom context menu is implemented for block actions, styled for clarity.
- **Component Structure:**
  - The app is modular, with clear separation between the block panel, canvas, and main logic.
- **Hydration Safety:**
  - All unique IDs and random values are generated only in event handlers, ensuring SSR/CSR consistency.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


