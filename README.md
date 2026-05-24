# 🎓 CGPA & SGPA Calculator

A clean, modern web application for university students to calculate their Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA). Built with React, Vite, Tailwind CSS, and Motion.

## Features

- **Multi-Semester Tracking**: Navigate between multiple semesters and see your overall CGPA instantly.
- **Subject & Credit Management**: Add, update, and remove subjects dynamically per semester.
- **Theory vs. Practical**: Built-in support for different assessment structures:
  - **Theory**: Internal (30), Midterm (50), and End-Semester (100) calculations scaled to a standard 100-point total.
  - **Practical**: Standard 100-point assessment.
- **Optional Subjects**: Easy toggle to indicate optional subjects that shouldn't impact credit totals.
- **Real-Time Grade Calculation**: Grade points and letter grades (O, A+, A, etc.) calculate instantly, updating the sticky bottom results board.

## Local Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deploy to Vercel

This app is built with standard Vite + React and is completely ready to be deployed on Vercel with zero additional configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**To deploy:**
1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Leave the default Vite build commands (`npm run build` and `dist` output directory).
5. Click **Deploy**.
