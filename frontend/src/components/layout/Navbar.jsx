import { useInterviewContext } from "../../context/InterviewContext";

export default function Navbar() {
  const { company, interviewType } = useInterviewContext();

  return (
    <header className="w-full sticky top-0 z-50 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4">

        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-white leading-none">
              Interview-Aware
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-none">
              Hiring-Grade Evaluation
            </p>
          </div>
        </div>

        {/* Context Tags */}
        <div className="flex items-center gap-2 sm:gap-3">
          {interviewType && (
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {interviewType}
            </span>
          )}
          {company && (
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {company}
            </span>
          )}
        </div>

      </div>
    </header>
  );
}