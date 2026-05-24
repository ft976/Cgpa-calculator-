import { useState, useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { SubjectCard } from './components/SubjectCard';
import { ResultsBoard } from './components/ResultsBoard';
import { calculateSGPA, calculateCGPA } from './utils/gradeCalculations';
import { Subject, Semester } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Semester 1',
      subjects: [
        { id: '1', name: 'Mathematics', type: 'Theory', credits: 4, internal: 25, midTerm: 40, endSem: 85, practicalMarks: 0, isOptional: false }
      ]
    }
  ]);
  const [activeSemId, setActiveSemId] = useState<string>('1');

  const activeSemester = semesters.find(s => s.id === activeSemId) || semesters[0];

  const addSemester = () => {
    const newSemId = Math.random().toString(36).substring(7);
    const newSem: Semester = {
      id: newSemId,
      name: `Semester ${semesters.length + 1}`,
      subjects: []
    };
    setSemesters([...semesters, newSem]);
    setActiveSemId(newSemId);
  };

  const removeSemester = (id: string) => {
    if (semesters.length === 1) return;
    const filtered = semesters.filter(s => s.id !== id);
    setSemesters(filtered);
    if (activeSemId === id) {
      setActiveSemId(filtered[0].id);
    }
  };

  const addSubject = () => {
    const newSub: Subject = {
      id: Math.random().toString(36).substring(7),
      name: `Subject ${activeSemester.subjects.length + 1}`,
      type: 'Theory',
      credits: 0,
      internal: 0,
      midTerm: 0,
      endSem: 0,
      practicalMarks: 0,
      isOptional: false,
    };
    setSemesters(semesters.map(sem => 
      sem.id === activeSemId 
        ? { ...sem, subjects: [...sem.subjects, newSub] }
        : sem
    ));
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSemesters(semesters.map(sem => 
      sem.id === activeSemId 
        ? { ...sem, subjects: sem.subjects.map(s => s.id === id ? { ...s, ...updates } : s) }
        : sem
    ));
  };

  const removeSubject = (id: string) => {
    setSemesters(semesters.map(sem => 
      sem.id === activeSemId 
        ? { ...sem, subjects: sem.subjects.filter(s => s.id !== id) }
        : sem
    ));
  };

  const currentSemResult = useMemo(() => calculateSGPA(activeSemester.subjects), [activeSemester.subjects]);
  const cgpaResult = useMemo(() => calculateCGPA(semesters), [semesters]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 transition-all duration-300">
        
        {/* Semester Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
          {semesters.map(sem => (
            <div key={sem.id} className="relative group shrink-0">
               <button
                 onClick={() => setActiveSemId(sem.id)}
                 className={cn(
                   "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                   activeSemId === sem.id 
                     ? "bg-black text-white border-black" 
                     : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                 )}
               >
                 {sem.name}
               </button>
               {semesters.length > 1 && (
                 <button 
                   onClick={() => removeSemester(sem.id)}
                   className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
                 >
                   <Trash2 className="w-3 h-3" />
                 </button>
               )}
            </div>
          ))}
          <button 
            onClick={addSemester}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border border-dashed border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Sem
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence presenceAffectsLayout mode="popLayout">
            {activeSemester.subjects.map((sub, idx) => (
              <SubjectCard
                key={sub.id}
                index={idx}
                subject={sub}
                updateSubject={updateSubject}
                removeSubject={removeSubject}
              />
            ))}
            {activeSemester.subjects.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">No subjects in this semester.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={addSubject}
          className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-medium hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50/50 transition-all active:scale-[0.99]"
        >
          <Plus className="w-5 h-5" />
          Add Subject
        </button>
      </main>

      <ResultsBoard semResult={currentSemResult} cgpaResult={cgpaResult} activeSemName={activeSemester.name} />
    </div>
  );
}
