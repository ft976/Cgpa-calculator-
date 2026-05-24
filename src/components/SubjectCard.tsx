import { X, Calculator, FlaskConical, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject } from '../types';
import { getSubjectScore, getGradePoint, getGradeLetter } from '../utils/gradeCalculations';
import { cn } from '../lib/utils';

interface SubjectCardProps {
  subject: Subject;
  index: number;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  removeSubject: (id: string) => void;
}

export function SubjectCard({ subject, index, updateSubject, removeSubject }: SubjectCardProps) {
  const score = getSubjectScore(subject);
  const gradePoint = getGradePoint(score);
  const gradeLetter = getGradeLetter(gradePoint);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white border rounded-xl overflow-hidden transition-all duration-200",
        subject.isOptional ? "border-gray-200 opacity-60" : "border-gray-200 shadow-sm hover:shadow-md"
      )}
    >
      {/* Card Header */}
      <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
            {index + 1}
          </span>
          <input
            type="text"
            value={subject.name}
            onChange={(e) => updateSubject(subject.id, { name: e.target.value })}
            placeholder="Subject Name"
            className="flex-1 bg-transparent border-none p-0 text-sm font-semibold text-gray-900 focus:ring-0 placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer group">
            <input 
              type="checkbox"
              checked={subject.isOptional}
              onChange={(e) => updateSubject(subject.id, { isOptional: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
            />
            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Optional</span>
          </label>
          
          <button 
            onClick={() => removeSubject(subject.id)}
            className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Remove subject"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col md:flex-row gap-6">
        
        {/* Core Config & Inputs */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Type</label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => updateSubject(subject.id, { type: 'Theory' })}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    subject.type === 'Theory' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Book className="w-3.5 h-3.5" /> Theory
                </button>
                <button
                  type="button"
                  onClick={() => updateSubject(subject.id, { type: 'Practical' })}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    subject.type === 'Practical' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <FlaskConical className="w-3.5 h-3.5" /> Practical
                </button>
              </div>
            </div>

            <div className="w-24">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Credits</label>
              <input 
                type="number" 
                min="0"
                step="0.5"
                value={subject.credits === 0 ? '' : subject.credits}
                onChange={(e) => updateSubject(subject.id, { credits: Number(e.target.value) })}
                className="w-full text-sm font-mono border border-gray-300 px-3 py-2 outline-none rounded-lg focus:border-black focus:ring-1 focus:ring-black"
                placeholder="0"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            {subject.type === 'Theory' ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Internal (30)</label>
                  <input 
                    type="number" min="0" max="30"
                    value={subject.internal === 0 ? '' : subject.internal}
                    onChange={(e) => updateSubject(subject.id, { internal: Math.min(30, Math.max(0, Number(e.target.value))) })}
                    className="w-full text-sm font-mono border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">MidTerm (50)</label>
                  <input 
                    type="number" min="0" max="50"
                    value={subject.midTerm === 0 ? '' : subject.midTerm}
                    onChange={(e) => updateSubject(subject.id, { midTerm: Math.min(50, Math.max(0, Number(e.target.value))) })}
                    className="w-full text-sm font-mono border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">EndSem (100)</label>
                  <input 
                    type="number" min="0" max="100"
                    value={subject.endSem === 0 ? '' : subject.endSem}
                    onChange={(e) => updateSubject(subject.id, { endSem: Math.min(100, Math.max(0, Number(e.target.value))) })}
                    className="w-full text-sm font-mono border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="0"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Total Marks (100)</label>
                <input 
                  type="number" min="0" max="100"
                  value={subject.practicalMarks === 0 ? '' : subject.practicalMarks}
                  onChange={(e) => updateSubject(subject.id, { practicalMarks: Math.min(100, Math.max(0, Number(e.target.value))) })}
                  className="w-full text-sm font-mono border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="0"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="w-full md:w-32 shrink-0 flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Score</span>
            <span className="font-mono text-xl text-gray-900">{score.toFixed(1)}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Grade Pts</span>
            <span className="font-mono text-xl text-gray-900">{gradePoint}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Letter</span>
            <span className={cn(
              "font-mono text-xl font-bold",
              gradeLetter === 'F' ? "text-red-500" : "text-gray-900"
            )}>{gradeLetter}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
