# Flashcards Project

A modern, responsive flashcard application built with React and TypeScript, featuring a beautiful UI and interactive learning experience.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Future Improvements](#future-improvements)
  - [Resources](#resources)

## Overview

### The Challenge

Users should be able to:

- Create and manage flashcard decks
- Study cards with spaced repetition
- Track learning progress
- Share decks with other users
- Experience a responsive design that works on all devices
- Enjoy a modern, intuitive user interface

### Screenshots

![](./public/screen%20shorts/Screenshot%202025-05-18%20003556.png)
![](./public/screen%20shorts/Screenshot%202025-05-18%20003744.png)
![](./public/screen%20shorts/Screenshot%202025-05-18%20004120.png)
![](./public/screen%20shorts/Screenshot%202025-05-18%20003817.png)


### Links

- Live Site: [Live URL](https://flashcards-project123.netlify.app/)

## My Process

### Built With

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI for accessible components
- React Router for navigation
- React Query for data fetching
- Framer Motion for animations
- React Hook Form for form handling
- Zod for schema validation

### What I Learned

- Implemented modern React patterns with TypeScript
- Enhanced understanding of component architecture
- Improved skills in creating responsive layouts with Tailwind CSS
- Learned how to use Radix UI for accessible components
- Gained experience with React Query for efficient data management

```typescript
// Example: Creating a reusable component with TypeScript
interface CardProps {
  title: string;
  content: string;
  onFlip: () => void;
}

const FlashCard: React.FC<CardProps> = ({ title, content, onFlip }) => {
  return (
    <div className="card" onClick={onFlip}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};
```

### Future Improvements

- Add user authentication and cloud sync
- Implement spaced repetition algorithm
- Add progress tracking and statistics
- Create a community feature for sharing decks
- Add offline support with PWA
- Implement dark/light theme toggle

---

### Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Vite Documentation](https://vitejs.dev/)

---
