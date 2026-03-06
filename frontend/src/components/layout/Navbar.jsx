import { useInterviewContext } from "../../context/InterviewContext";



export default function Navbar() {
  const { company, interviewType } = useInterviewContext();

  return (
    <header className="w-full px-10 py-4 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-white">
            Interview-Aware
          </h1>
          <p className="text-xs text-gray-500">
            Hiring-Grade Evaluation System
          </p>
        </div>

        <div className="flex gap-6 text-xs text-gray-400">
          {interviewType && (
            <span className="uppercase tracking-wider">
              {interviewType} interview
            </span>
          )}
          {company && (
            <span className="text-accent font-medium">
              {company}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
