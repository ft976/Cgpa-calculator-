import { GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

export function Header() {
  return (
    <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-black rounded-lg">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-sans font-semibold text-lg text-gray-900 tracking-tight">CGPA & SGPA Calculator</h1>
          <p className="text-xs text-gray-500 font-medium">Standard University Grading Framework</p>
        </div>
      </div>
    </header>
  );
}
