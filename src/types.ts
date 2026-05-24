export type SubjectType = 'Theory' | 'Practical';

export interface Subject {
  id: string;
  name: string;
  type: SubjectType;
  credits: number;
  internal: number;
  midTerm: number;
  endSem: number;
  practicalMarks: number;
  isOptional: boolean;
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface CalculationResult {
  totalCreditPoints: number;
  totalCredits: number;
  sgpa: number;
  percentage: number;
}
