import { useNavigate } from "react-router-dom";
import { useInterviewContext } from "../context/InterviewContext";




export default function InterviewType() {
  const navigate = useNavigate();
  const { setInterviewType } = useInterviewContext();

  const handleSelect = (type) => {
    // lock interview context
    setInterviewType(type);

    // move to company selection (backend-driven flow)
    navigate(`/company?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-8">
      <div className="max-w-6xl w-full">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-gray-600 mb-5">
            Interview Context Lock
          </div>

          <h1 className="text-4xl font-semibold tracking-tight leading-tight">
            This choice determines
            <br />
            <span className="text-accent">
              how you will be evaluated
            </span>
          </h1>

          <p className="mt-6 text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Different companies evaluate candidates differently.
            Select the interview environment you are entering.
            This cannot be changed once the interview begins.
          </p>
        </div>

        {/* DECISION CARDS */}
        <div className="grid md:grid-cols-2 gap-14">

          {/* PRODUCT BASED */}
          <button
            onClick={() => handleSelect("product")}
            className="group relative p-12 rounded-2xl border border-white/10
                       bg-gradient-to-br from-white/5 to-transparent
                       text-left transition-all duration-300
                       hover:border-accent hover:shadow-[0_0_0_1px_rgba(0,255,255,0.2)]"
          >
            <div className="mb-6 text-xs uppercase tracking-[0.3em] text-gray-500">
              Product Companies
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              Design & Systems Interview
            </h2>

            <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
              <li>• Algorithmic depth and complexity analysis</li>
              <li>• Trade-offs and scalability decisions</li>
              <li>• Edge-case awareness and robustness</li>
              <li>• Clean abstractions and reasoning clarity</li>
            </ul>

            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-500">
              Interviewers expect ownership-level thinking.
            </div>

            <div className="absolute top-6 right-6 text-xs text-gray-600">
              High Bar
            </div>
          </button>

          {/* SERVICE BASED */}
          <button
            onClick={() => handleSelect("service")}
            className="group relative p-12 rounded-2xl border border-white/10
                       bg-gradient-to-br from-white/5 to-transparent
                       text-left transition-all duration-300
                       hover:border-accent hover:shadow-[0_0_0_1px_rgba(0,255,255,0.2)]"
          >
            <div className="mb-6 text-xs uppercase tracking-[0.3em] text-gray-500">
              Service Companies
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              Problem Solving Interview
            </h2>

            <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
              <li>• Step-by-step problem understanding</li>
              <li>• Correctness and clarity of explanation</li>
              <li>• Constraint handling and adaptability</li>
              <li>• Communication and reasoning flow</li>
            </ul>

            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-500">
              Interviewers focus on clarity and consistency.
            </div>

            <div className="absolute top-6 right-6 text-xs text-gray-600">
              Structured
            </div>
          </button>

        </div>

        {/* FOOTNOTE */}
        <div className="mt-20 text-center text-xs text-gray-600 tracking-wide">
          Once selected, evaluation criteria are locked for this session.
        </div>

      </div>
    </div>
  );
}

