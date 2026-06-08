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
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden font-[Inter]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');

          .font-sora { font-family: 'Sora', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
          }

          .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease forwards; }
          .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }

          /* Prevent horizontal overflow globally */
          html, body {
            overflow-x: hidden;
          }
        `}
      </style>

      {/* Background Elements - scaled for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-6 sm:top-10 left-4 sm:left-10 w-40 h-40 sm:w-64 sm:h-64 bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-10 w-52 h-52 sm:w-80 sm:h-80 bg-[#3b82f6]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl w-full relative z-10 py-8 sm:py-10 md:py-12">

        {/* HEADER */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center opacity-0 animate-fade-in px-1 sm:px-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Step 1 of 3</span>
          </div>

          <h1 className="font-sora font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4 sm:mb-6">
            Choose your
            <span className="block text-[#2563EB] mt-1 sm:mt-2">interview path</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
            Select the environment that matches your target role. 
            Each path has distinct evaluation criteria tailored to industry standards.
          </p>
        </div>

        {/* DECISION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

          {/* PRODUCT BASED */}
          <button
            onClick={() => handleSelect("product")}
            className="group relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl bg-white border-2 border-[#E2E8F0] text-left transition-all duration-300 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10 hover:-translate-y-1 opacity-0 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Selected Indicator */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#E2E8F0] group-hover:border-[#2563EB] flex items-center justify-center transition-colors">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#2563EB] transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#2563EB] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1.5 sm:mb-2">
                Product Companies
              </div>
              <h2 className="font-sora font-bold text-xl sm:text-2xl text-[#0F172A] mb-1.5 sm:mb-2">
                Design & Architecture
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                For roles at tech companies building consumer or enterprise products
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#475569] mb-5 sm:mb-8">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Deep algorithmic complexity analysis</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>System design and scalability trade-offs</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Edge-case handling and robustness</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ownership-level architectural thinking</span>
              </li>
            </ul>

            <div className="pt-4 sm:pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Difficulty</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB]" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB]" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB]" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E2E8F0]" />
              </div>
            </div>
          </button>

          {/* SERVICE BASED */}
          <button
            onClick={() => handleSelect("service")}
            className="group relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl bg-white border-2 border-[#E2E8F0] text-left transition-all duration-300 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/10 hover:-translate-y-1 opacity-0 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Selected Indicator */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#E2E8F0] group-hover:border-[#2563EB] flex items-center justify-center transition-colors">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#2563EB] transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#64748B] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5 sm:mb-2">
                Service Companies
              </div>
              <h2 className="font-sora font-bold text-xl sm:text-2xl text-[#0F172A] mb-1.5 sm:mb-2">
                Problem Solving
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                For consulting and outsourcing firms with structured interview processes
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#475569] mb-5 sm:mb-8">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Step-by-step problem decomposition</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Clear communication and explanation</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Constraint handling and adaptability</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Consistent reasoning flow</span>
              </li>
            </ul>

            <div className="pt-4 sm:pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Difficulty</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB]" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB]" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E2E8F0]" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E2E8F0]" />
              </div>
            </div>
          </button>

        </div>

        {/* FOOTNOTE */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center opacity-0 animate-fade-in px-2 sm:px-0" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-start sm:items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8] flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs sm:text-sm text-[#64748B] text-left sm:text-center">
              Your selection locks the evaluation criteria for this session
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}