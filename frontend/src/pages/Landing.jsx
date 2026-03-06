import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  // Single source of truth for navigation
  const handleStartInterview = () => {
    navigate("/login");
  };

  const handleSeeJudgement = () => {
    navigate("/login"); 
    // future: route to /about or /how-it-works if needed
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans pt-6">

      {/* NAVBAR */}
      <header
        className="mx-auto max-w-7xl px-10 py-4
                   flex items-center justify-between
                   rounded-full border border-white/10
                   bg-white/5 backdrop-blur
                   opacity-0 translate-y-[-10px]
                   animate-[fadeDown_0.6s_ease-out_forwards]"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-white">
            Interview-Aware
          </h1>
          <span className="text-gray-600">•</span>
          <span className="text-xs tracking-wide text-gray-400">
            Hiring-Grade Evaluation
          </span>
        </div>

        {/* CENTER */}
        <div className="hidden md:block text-xs tracking-[0.2em] text-gray-500">
          Technical Interview Environment
        </div>

        {/* RIGHT */}
        <div
          className="px-4 py-1.5 rounded-full
                     border border-white/15
                     text-xs font-medium
                     text-accent bg-accent/10"
        >
          Live Interview Mode
        </div>
      </header>

      {/* MAIN */}
      <main
        className="max-w-7xl mx-auto px-12 pt-24 pb-28
                   opacity-0 translate-y-6
                   animate-[fadeUp_0.7s_ease-out_0.15s_forwards]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* LEFT — HERO */}
          <section>
            <div className="mb-6 text-xs uppercase tracking-[0.25em] text-gray-500">
              Technical Interview Simulation
            </div>

            <h2 className="text-5xl font-semibold leading-tight tracking-tight">
              Correct code
              <br />
              <span className="text-accent">doesn’t get you hired</span>
            </h2>

            <p className="mt-10 text-lg leading-relaxed text-gray-400 max-w-xl">
              Interviews evaluate reasoning, trade-offs, and adaptability.
              This system questions candidates based on their own code —
              mirroring how real interviewers think and decide.
            </p>

            <div className="mt-14 flex gap-6">
              <button
                onClick={handleStartInterview}
                className="px-8 py-3 text-sm font-medium
                           bg-accent text-black rounded-md
                           transition-all duration-200 ease-out
                           hover:bg-accent/90 hover:-translate-y-[1px]"
              >
                Start Interview Simulation
              </button>

              <button
                onClick={handleSeeJudgement}
                className="px-8 py-3 text-sm font-medium
                           border border-white/20 text-gray-300
                           rounded-md
                           transition-all duration-200 ease-out
                           hover:border-white/40 hover:-translate-y-[1px]"
              >
                See How Candidates Are Judged
              </button>
            </div>
          </section>

          {/* RIGHT — INTERVIEW EVALUATION RAIL */}
          <aside className="relative pl-12">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

            <div className="flex flex-col gap-10 text-sm text-gray-300">
              <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Interview Evaluation In Progress
              </div>

              <div className="space-y-6">
                {[
                  ["Solution validity", "Reviewed"],
                  ["Algorithmic approach & complexity", "Under evaluation"],
                  ["Design decisions & trade-offs", "Under evaluation"],
                  ["Clarity and consistency of explanation", "Pending"],
                  ["Response to changing constraints", "Pending"]
                ].map(([label, status], index) => (
                  <div
                    key={label}
                    className="flex justify-between
                               opacity-0 translate-y-3
                               animate-[fadeUp_0.4s_ease-out_forwards]"
                    style={{ animationDelay: `${0.3 + index * 0.08}s` }}
                  >
                    <span>{label}</span>
                    <span
                      className={
                        status === "Under evaluation"
                          ? "text-accent font-medium"
                          : "text-gray-400"
                      }
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="pt-6 text-xs leading-relaxed text-gray-500 max-w-sm
                           opacity-0 animate-[fadeUp_0.4s_ease-out_0.8s_forwards]"
              >
                Deterministic hiring verdicts.
                No scores. No rankings. No black boxes.
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="max-w-7xl mx-auto px-12 py-8
                   border-t border-white/10
                   flex flex-col md:flex-row
                   items-start md:items-center
                   justify-between gap-6
                   text-xs text-gray-500"
      >
        <div className="leading-relaxed">
          Built to reflect how real interviewers think —  
          not how platforms score.
        </div>

        <div className="flex gap-4 tracking-wide text-gray-400">
          <span>Explainable decisions</span>
          <span className="text-gray-700">•</span>
          <span>Code-first evaluation</span>
          <span className="text-gray-700">•</span>
          <span>No black boxes</span>
        </div>

        <div className="uppercase tracking-[0.25em] text-gray-600">
          Interview System Active
        </div>
      </footer>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes fadeUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeDown {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
