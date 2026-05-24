import { motion } from 'motion/react';
import { CalculationResult } from '../types';

interface ResultsBoardProps {
  semResult: CalculationResult;
  cgpaResult: { cgpa: number; totalCredits: number };
  activeSemName: string;
}

export function ResultsBoard({ semResult, cgpaResult, activeSemName }: ResultsBoardProps) {
  return (
    <div className="sticky bottom-0 w-full mt-auto bg-gray-900 border-t border-gray-800 p-4 pb-6 sm:pb-4 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-40">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Semester Stats */}
        <div className="flex flex-1 items-center justify-between md:justify-start gap-6 bg-gray-800/50 rounded-xl px-4 py-3 shrink-0">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{activeSemName} SGPA</span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl text-emerald-400 font-bold">{semResult.sgpa.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="flex flex-col">
               <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1">Credits</span>
               <span className="font-mono text-lg text-gray-200">{semResult.totalCredits.toFixed(1)}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1">Percentage</span>
               <span className="font-mono text-lg text-gray-200">{semResult.percentage.toFixed(2)}%</span>
             </div>
          </div>
        </div>

        {/* Global CGPA */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Credits</span>
             <span className="font-mono text-xl text-white">{cgpaResult.totalCredits.toFixed(1)}</span>
          </div>
          <div className="w-px h-10 bg-gray-700 hidden sm:block"></div>
          <motion.div 
            key={cgpaResult.cgpa}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-end"
          >
             <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Overall CGPA</span>
             <span className="font-mono text-4xl text-white font-bold">{cgpaResult.cgpa.toFixed(2)}</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
