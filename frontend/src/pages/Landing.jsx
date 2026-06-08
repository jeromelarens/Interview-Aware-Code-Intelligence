import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStartInterview = () => {
    navigate("/login");
  };

  const handleSeeJudgement = () => {
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

          .font-display {
            font-family: 'Space Grotesk', sans-serif;
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .animate-slide-down {
            animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-slide-up {
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }

          .text-gradient {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .indigo-glow {
            box-shadow: 0 0 60px rgba(79, 70, 229, 0.15);
          }

          .card-hover {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px -12px rgba(79, 70, 229, 0.15);
          }

          .mobile-menu-enter {
            animation: slideDown 0.3s ease-out forwards;
          }

          html, body {
            overflow-x: hidden;
          }

          html {
            scroll-behavior: smooth;
          }

          .code-block {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .code-block::-webkit-scrollbar {
            height: 4px;
          }
          .code-block::-webkit-scrollbar-track {
            background: transparent;
          }
          .code-block::-webkit-scrollbar-thumb {
            background: #4b5563;
            border-radius: 2px;
          }
        `}
      </style>

      {/* ==================== NAVBAR ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-2.5 md:py-3 rounded-2xl md:rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 shadow-sm opacity-0 animate-slide-down">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative w-8 h-8 md:w-9 md:h-9 bg-black rounded-xl flex items-center justify-center overflow-hidden group shrink-0">
                  <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight hidden sm:inline">
                  <span className="hidden lg:inline">INTERVIEW-AWARE CODE INTEGIGENCE</span>
                  <span className="lg:hidden">IACI</span>
                </span>
              </div>
              {/* <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-500">
                <span className="hover:text-black cursor-pointer transition-colors">Product</span>
                <span className="hover:text-black cursor-pointer transition-colors">Solutions</span>
                <span className="hover:text-black cursor-pointer transition-colors">Enterprise</span>
              </div> */}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-black transition-colors px-2">
                Log In
              </button>
              <button 
                onClick={handleStartInterview}
                className="px-3 sm:px-4 md:px-5 py-2 md:py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 whitespace-nowrap"
              >
                Get Started
              </button>
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="md:hidden mt-2 px-4 py-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg mobile-menu-enter">
              <div className="flex flex-col gap-3">
                {/* <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Product</span>
                <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Solutions</span>
                <span className="text-sm font-medium text-gray-600 hover:text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Enterprise</span> */}
                <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold text-indigo-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                  </span>
                  Live Assessments Active
                </div>
                <hr className="border-gray-100" />
                <button className="text-left text-sm font-semibold text-gray-600 hover:text-black transition-colors py-2 px-2">
                  Log In
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">

            {/* LEFT: Text Content */}
            <div className="opacity-0 animate-slide-up delay-100">

              {/* MOBILE ONLY: Brand Name Display */}
              <div className="lg:hidden mb-6">
                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-[#0F172A] leading-tight">Interview Aware</p>
                    <p className="font-display font-bold text-lg text-indigo-600 leading-tight">Code Inteligence</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6 sm:mb-8">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 shrink-0"></span>
                <span className="text-xs sm:text-sm font-semibold text-indigo-700">AI-Powered Intelligence</span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6">
                Evaluate beyond
                <span className="block text-gradient mt-1 sm:mt-2">the code</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mb-6 sm:mb-8 md:mb-10">
                Identify engineers who architect scalable systems, communicate complex ideas, and adapt when constraints shift. Not just syntax experts—problem solvers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
                <button
                  onClick={handleStartInterview}
                  className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-indigo-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Start Free Trial
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <button
                  onClick={handleSeeJudgement}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  See How It Works
                </button>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 flex-wrap">
                <div className="flex -space-x-2 shrink-0">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-700">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>Trusted by <span className="font-semibold text-black">2,000+</span> tech teams</p>
              </div>
            </div>

            {/* RIGHT: Demo Card — DESKTOP ONLY */}
            <div className="relative opacity-0 animate-slide-up delay-300 hidden lg:block">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-indigo-100/50 to-purple-100/30 rounded-2xl sm:rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 indigo-glow border border-gray-100">
                <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shrink-0">
                      <span className="text-base sm:text-xl font-bold text-indigo-700">MR</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-base sm:text-lg truncate">Marcus Reid</h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">Senior Engineer Candidate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100 shrink-0 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                    <span className="hidden sm:inline">Live Session</span>
                    <span className="sm:hidden">Live</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {[
                    { label: "System Architecture", status: "completed", score: "Exceptional" },
                    { label: "Code Implementation", status: "completed", score: "Strong" },
                    { label: "Debugging Approach", status: "active", score: "Analyzing..." },
                    { label: "Technical Communication", status: "active", score: "In Progress" },
                    { label: "Scalability Reasoning", status: "pending", score: "Queued" }
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className="group flex items-center justify-between p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 opacity-0 animate-slide-up"
                      style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'forwards' }}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                          item.status === 'completed' ? 'bg-green-100 text-green-700' :
                          item.status === 'active' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {item.status === 'completed' ? (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : item.status === 'active' ? (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          ) : (
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`font-semibold text-xs sm:text-sm truncate ${item.status === 'pending' ? 'text-gray-400' : 'text-black'}`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                            {item.status === 'completed' ? 'Validated' : item.status === 'active' ? 'Real-time processing' : 'Pending review'}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full shrink-0 ml-2 whitespace-nowrap ${
                        item.status === 'completed' ? 'bg-green-100 text-green-700' :
                        item.status === 'active' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <span className="hidden sm:inline">{item.score}</span>
                        <span className="sm:hidden">
                          {item.status === 'completed' ? '✓' : item.status === 'active' ? '...' : '○'}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="text-gray-500">Hiring Confidence</span>
                    <span className="font-display font-bold text-indigo-600 text-xs sm:text-sm">Recommend: Strong Hire</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-14 h-14 sm:w-20 sm:h-20 bg-indigo-100 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-20 h-20 sm:w-28 sm:h-28 bg-purple-100 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 opacity-0 animate-slide-up delay-100">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">Everything you need to <span className="text-gradient">hire better</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">Comprehensive tools designed to evaluate the complete engineer—not just their coding speed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "Holistic Evaluation",
                desc: "Assess problem-solving, system design, and communication in unified sessions that mirror real work scenarios.",
                icon: "◆"
              },
              {
                title: "Intelligent Insights",
                desc: "AI-generated recommendations based on behavioral patterns, code quality, and architectural decisions.",
                icon: "◈"
              },
              {
                title: "Bias Reduction",
                desc: "Structured evaluations designed to focus on capability and potential, not background or pedigree.",
                icon: "◇"
              }
            ].map((feature, idx) => (
              <div 
                key={feature.title} 
                className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-gray-100 card-hover cursor-pointer opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.2 + idx * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black text-white flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 group-hover:bg-indigo-600 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 opacity-0 animate-slide-up">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">How it <span className="text-gradient">works</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">From setup to decision in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

            {[
              {
                step: "01",
                title: "Design Assessment",
                desc: "Configure role-specific evaluations combining coding, architecture, and collaboration scenarios."
              },
              {
                step: "02",
                title: "Candidate Session",
                desc: "Invite candidates to an interactive session where they solve real problems while you observe."
              },
              {
                step: "03",
                title: "Intelligent Report",
                desc: "Receive comprehensive analysis with hiring recommendations and detailed behavioral insights."
              }
            ].map((item, idx) => (
              <div 
                key={item.step} 
                className="relative z-10 bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 card-hover opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.1 + idx * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-lg sm:text-xl mb-4 sm:mb-6">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DEMO PREVIEW ==================== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="opacity-0 animate-slide-up delay-100">
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">See the <span className="text-indigo-400">difference</span></h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Watch how NexusEval transforms a standard technical interview into a comprehensive evaluation of engineering potential.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Real-time collaborative coding environment",
                  "AI-powered behavioral analysis",
                  "Automated scoring rubrics",
                  "Team collaboration insights"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start sm:items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSeeJudgement}
                className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto"
              >
                Watch Full Demo
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            <div className="relative opacity-0 animate-slide-up delay-300">
              <div className="absolute -inset-2 sm:-inset-4 bg-indigo-600/20 rounded-2xl sm:rounded-3xl blur-2xl" />
              <div className="relative bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  <div className="ml-3 sm:ml-4 text-xs sm:text-sm text-gray-500 truncate">interview-session.tsx</div>
                </div>
                <div className="code-block space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                  <div className="text-gray-400">// Live coding session in progress</div>
                  <div className="text-purple-400">function <span className="text-yellow-300">optimizeDatabase</span>(<span className="text-blue-400">queries</span>) {'{'}</div>
                  <div className="pl-2 sm:pl-4 text-gray-300">// Candidate is explaining their approach...</div>
                  <div className="pl-2 sm:pl-4 text-green-400">// AI Analysis: Strong communication clarity</div>
                  <div className="pl-2 sm:pl-4 text-gray-300">const <span className="text-blue-400">cache</span> = <span className="text-purple-400">new</span> Map();</div>
                  <div className="pl-2 sm:pl-4 text-gray-300">return queries.<span className="text-yellow-300">map</span>(q ={'>'} {'{'}</div>
                  <div className="pl-4 sm:pl-8 text-gray-300">// Implementation details...</div>
                  <div className="pl-2 sm:pl-4 text-gray-300">{'}'});</div>
                  <div className="text-gray-300">{'}'}</div>
                </div>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    AI Insight
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Candidate demonstrates excellent understanding of memoization patterns and explains trade-offs clearly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              { value: "94%", label: "Prediction Accuracy", sub: "Industry leading" },
              { value: "3x", label: "Faster Time-to-Hire", sub: "Streamlined process" },
              { value: "50K+", label: "Assessments Completed", sub: "Global reach" },
              { value: "4.9/5", label: "Client Satisfaction", sub: "Hiring managers love us" }
            ].map((stat, idx) => (
              <div 
                key={stat.label} 
                className="text-center p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-gray-100 card-hover opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.1 + idx * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
       {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-gray-200 bg-gray-50/50 py-10 sm:py-12 md:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 mb-10 sm:mb-12">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-black rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-base sm:text-lg text-black block leading-tight">INTERVIEW AWARE</span>
                <span className="font-display font-bold text-base sm:text-lg text-indigo-600 block leading-tight">CODE INTELIGENCE</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="https://www.linkedin.com/in/jerome-larens-5b244b3a9/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/jeromelarens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="mailto:jeromelarens7@gmail.com" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">

            {/* Gmail */}
            <a 
              href="mailto:jeromelarens7@gmail.com"
              className="group flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Gmail</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">jeromelarens7@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a 
              href="tel:+916379623208"
              className="group flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Mobile</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">+91 6379623208</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Location</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">Chennai, India</p>
              </div>
            </div>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/jerome-larens-5b244b3a9/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">LinkedIn</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">Jeromelarens</p>
              </div>
            </a>

          </div>

          {/* GitHub Row */}
          <a 
            href="https://github.com/jeromelarens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 mb-10 sm:mb-12"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">GitHub</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">Jeromelarens</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2024 Interview Aware Code Inteligence. Built with passion in Chennai.
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-xs sm:text-sm text-gray-500 hover:text-black cursor-pointer transition-colors">Privacy</span>
              <span className="text-xs sm:text-sm text-gray-500 hover:text-black cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}