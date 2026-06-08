import { useNavigate, useSearchParams } from "react-router-dom";
import { companies } from "../config/companies.config";
import { useInterviewContext } from "../context/InterviewContext";

export default function CompanySelect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const interviewType = searchParams.get("type");
  const { setCompany, setInterviewType } = useInterviewContext();

  if (!interviewType || !companies[interviewType]) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#64748B] flex items-center justify-center px-4 font-[Inter]">
        <div className="text-center px-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#F1F5F9] flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-base sm:text-lg font-semibold text-[#0F172A]">Invalid interview type</p>
          <p className="text-xs sm:text-sm mt-1">Please select a valid interview mode to continue</p>
        </div>
      </div>
    );
  }

  const handleSelectCompany = (company) => {
    const companyName = typeof company === "string" ? company : company.name;
    setInterviewType(interviewType);
    setCompany(companyName);
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] px-4 sm:px-6 py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden font-[Inter]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');

          .font-sora { font-family: 'Sora', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease forwards; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 3s; }

          /* Prevent horizontal overflow globally */
          html, body {
            overflow-x: hidden;
          }
        `}
      </style>

      {/* Background Elements - scaled for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[#2563EB]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-[#3b82f6]/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-[#F1F5F9]/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Navigation */}
        <div className="mb-6 sm:mb-8 md:mb-12 opacity-0 animate-fade-in">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F1F5F9] group-hover:bg-[#EFF6FF] flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Back
          </button>
        </div>

        {/* HEADER */}
        <div className="mb-10 sm:mb-12 md:mb-16 text-center opacity-0 animate-fade-in px-1 sm:px-0" style={{ animationDelay: '0.1s' }}>

          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Step 2 of 3</span>
          </div>

          <h1 className="font-sora font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4 sm:mb-6">
            Select your
            <span className="block text-[#2563EB] mt-1 sm:mt-2">target company</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
            Choose the company environment that matches your interview goals. 
            We'll adapt the evaluation criteria to match their engineering standards.
          </p>

          {/* Dynamic Type Indicator */}
          <div className="mt-5 sm:mt-6 md:mt-8 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
            <span className="text-xs sm:text-sm font-medium text-[#64748B]">Interview Mode:</span>
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider">
              {interviewType}
            </span>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

          {companies[interviewType].map((company, index) => {
            const companyName = typeof company === "string" ? company : company.name;
            const logo = typeof company === "string" ? null : company.logo;

            return (
              <button
                key={companyName}
                onClick={() => handleSelectCompany(company)}
                className="group relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/10 hover:border-[#2563EB]/30 hover:-translate-y-1 transition-all duration-300 text-left opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">

                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    {/* Logo or Initials */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center group-hover:border-[#2563EB]/30 group-hover:bg-[#EFF6FF] transition-colors">
                      {logo ? (
                        <img
                          src={logo}
                          alt={companyName}
                          className="h-5 w-5 sm:h-6 sm:h-6 md:h-8 md:w-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <span className="font-sora font-bold text-base sm:text-lg md:text-xl text-[#2563EB]">
                          {companyName.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-sora font-bold text-lg sm:text-xl text-[#0F172A] mb-1.5 sm:mb-2 group-hover:text-[#2563EB] transition-colors">
                      {companyName}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-3 sm:mb-4">
                      Experience {companyName}'s technical interview standards and evaluation criteria.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-xs font-medium">
                        Technical
                      </span>
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-xs font-medium">
                        {interviewType}
                      </span>
                    </div>
                  </div>

                </div>
              </button>
            );
          })}

        </div>

        {/* Bottom Info */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center opacity-0 animate-fade-in px-2 sm:px-0" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-start sm:items-center gap-2 text-xs sm:text-sm text-[#94A3B8]">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-left sm:text-center">Can't find your company? <button className="text-[#2563EB] font-semibold hover:underline">Request addition</button></span>
          </div>
        </div>

      </div>
    </div>
  );
}