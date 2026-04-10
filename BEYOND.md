# Above and Beyond Features - Miles Krawitz

### 1. Robust Input Validation
- **Location:** `script.js` | `makeGuess()` function.
- **Description:** Added logic to detect and ignore `NaN` or empty inputs.
- **Impact:** Ensures the user's score and guess count aren't negatively impacted by accidental clicks, reflecting a more professional "production-ready" software approach.

### 2. High-Precision Timing System
- **Location:** `script.js` | `updateTimers()` and `play()` functions.
- **Description:** Utilized `new Date().getTime()` to measure round duration in milliseconds.
- **Impact:** Provides much more granular feedback for the "Fastest Game" statistic compared to simple second-counting, fitting for an engineering-focused mindset.

### 3. Programmatic Date Suffix Algorithm
- **Location:** `script.js` | `time()` function.
- **Description:** Implemented a mathematical algorithm to correctly assign "st", "nd", "rd", and "th" suffixes to the current date, including exception handling for the 11th-13th.
- **Impact:** Demonstrates a deeper understanding of conditional logic beyond basic hard-coding.

### 4. Optimized Operator Workflow
- **Location:** `script.js` | `play()` and `endRound()` functions.
- **Description:** Implemented strict state management for all buttons and inputs to prevent logical conflicts (like resetting the answer mid-game).
- **Impact:** Protects the integrity of the game data and provides a smoother user experience.