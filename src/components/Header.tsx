import { useState } from 'react';
import { GraduationCap, Info, Github, Linkedin, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export function Header() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-sans font-semibold text-lg text-gray-900 tracking-tight">CGPA & SGPA Calculator</h1>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">Standard University Grading Framework</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 border-l border-gray-200/50 pl-2 ml-2 sm:border-none sm:pl-0 sm:ml-0">
            <a
              href="https://github.com/ft976/Cgpa-calculator-.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors shrink-0"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Source</span>
            </a>
            <button 
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors shrink-0"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showAbout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAbout(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-gray-900" />
                  </div>
                  <button 
                    onClick={() => setShowAbout(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">CGPA & SGPA Calculator</h2>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  A modern tool designed to help university students accurately track and calculate their semester and cumulative grade point averages.
                </p>

                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Developer Details</h3>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-3 border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Name</span>
                      <span className="text-sm font-semibold text-gray-900">Rehan97</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://github.com/ft976" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors group"
                    >
                      <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900 mb-2" />
                      <span className="text-xs font-semibold text-gray-700">@ft976</span>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/rehan-ahmad-863386382?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors group text-center"
                    >
                      <Linkedin className="w-6 h-6 text-blue-600 group-hover:text-blue-700 mb-2" />
                      <span className="text-xs font-semibold text-blue-700">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
