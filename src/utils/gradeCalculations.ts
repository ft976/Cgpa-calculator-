import { Subject, CalculationResult, Semester } from '../types';

export function getGradePoint(score: number): number {
  const rounded = Math.round(score);
  if (rounded >= 90) return 10;
  if (rounded >= 80) return 9;
  if (rounded >= 70) return 8;
  if (rounded >= 60) return 7;
  if (rounded >= 50) return 6;
  if (rounded >= 40) return 5;
  return 0; // Fail
}

export function getGradeLetter(gradePoint: number): string {
  switch (gradePoint) {
    case 10: return 'O';
    case 9: return 'A+';
    case 8: return 'A';
    case 7: return 'B+';
    case 6: return 'B';
    case 5: return 'C';
    default: return 'F';
  }
}

export function getSubjectScore(sub: Subject): number {
  if (sub.type === 'Theory') {
    // Internal (max 30), Mid (max 50 mapped to 20), End (max 100 mapped to 50)
    const midTermScaled = (Math.max(0, Math.min(50, sub.midTerm || 0)) / 50) * 20;
    const endSemScaled = (Math.max(0, Math.min(100, sub.endSem || 0)) / 100) * 50;
    const internal = Math.max(0, Math.min(30, sub.internal || 0));
    
    return internal + midTermScaled + endSemScaled;
  } else {
    // Practical (max 100)
    return Math.max(0, Math.min(100, sub.practicalMarks || 0));
  }
}

export function calculateSGPA(subjects: Subject[]): CalculationResult {
  let totalCreditPoints = 0;
  let totalCredits = 0;

  for (const sub of subjects) {
    if (sub.isOptional) continue;

    const score = getSubjectScore(sub);
    const gradePoint = getGradePoint(score);
    
    totalCredits += sub.credits;
    totalCreditPoints += gradePoint * sub.credits;
  }

  const sgpa = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;
  const percentage = sgpa * 10;

  return {
    totalCreditPoints,
    totalCredits,
    sgpa,
    percentage
  };
}

export function calculateCGPA(semesters: Semester[]): { cgpa: number, totalCredits: number } {
  let totalCredits = 0;
  let totalCreditPoints = 0;
  
  for (const sem of semesters) {
    const semResult = calculateSGPA(sem.subjects);
    if (semResult.totalCredits > 0) {
      totalCredits += semResult.totalCredits;
      totalCreditPoints += semResult.sgpa * semResult.totalCredits;
    }
  }

  const cgpa = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;
  return { cgpa, totalCredits };
}
