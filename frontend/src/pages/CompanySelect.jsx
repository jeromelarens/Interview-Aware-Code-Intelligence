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
      <div className="min-h-screen bg-[#0b0b0b] text-gray-500 flex items-center justify-center">
        Invalid interview type
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
    <div className="min-h-screen bg-[#0b0b0b] text-white px-8 py-24 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-20 text-center opacity-0 animate-[fadeIn_0.8s_ease_forwards]">

          <p className="text-xs uppercase tracking-[0.4em] text-gray-600 mb-6">
            Company Selection
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Interview Environment
            </span>
          </h1>

          {/* Dynamic Type Indicator */}
          <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full 
                          bg-white/5 border border-white/10 text-xs tracking-wide text-gray-300 backdrop-blur-md">
            Mode:
            <span className="ml-2 text-cyan-400 uppercase">
              {interviewType}
            </span>
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {companies[interviewType].map((company, index) => {
            const companyName =
              typeof company === "string" ? company : company.name;
            const logo =
              typeof company === "string" ? null : company.logo;

            return (
              <button
                key={companyName}
                onClick={() => handleSelectCompany(company)}
                className="
                  group relative p-10 rounded-2xl
                  border border-transparent
                  bg-white/5 backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:shadow-2xl
                  opacity-0 animate-[fadeUp_0.6s_ease_forwards]
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >

                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-2xl p-[1px]
                                bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-500"></div>

                <div className="relative z-10">

                  {/* Logo */}
                  {logo && (
                    <div className="mb-6 flex justify-center">
                      <img
                        src={logo}
                        alt={companyName}
                        className="h-10 object-contain opacity-80 group-hover:opacity-100 transition"
                      />
                    </div>
                  )}

                  {/* Name */}
                  <div className="text-xl font-medium tracking-tight text-center">
                    {companyName}
                  </div>

                  {/* Subtitle */}
                  <div className="mt-4 text-sm text-gray-400 text-center leading-relaxed">
                    Evaluation will align with {companyName}'s engineering expectations.
                  </div>

                </div>
              </button>
            );
          })}

        </div>

      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fadeIn {
            to { opacity: 1; }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
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
