import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("EMAIL");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setError("");
    if (!email) {
      setError("Email required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/type");
      setLoading(false);

    } catch {
      setError("Server error");
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/type");

    } catch {
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden font-[Inter]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');

          .font-sora { font-family: 'Sora', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.3); opacity: 0; }
          }

          .animate-fade-in { animation: fadeIn 0.5s ease forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease forwards; }

          /* Prevent horizontal overflow globally */
          html, body {
            overflow-x: hidden;
          }

          /* OTP input responsive letter spacing */
          .otp-input {
            letter-spacing: 0.3em;
          }
          @media (min-width: 400px) {
            .otp-input {
              letter-spacing: 0.5em;
            }
          }
        `}
      </style>

      {/* Background Elements - scaled for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-[#F1F5F9]/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[22rem] sm:max-w-md relative z-10 opacity-0 animate-slide-up py-8 sm:py-0">

        {/* Logo/Brand */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
            <div className="relative">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#2563EB] rounded-full" />
              <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#2563EB] rounded-full animate-ping opacity-75" />
            </div>
            <span className="font-sora font-bold text-[#0F172A] text-xs sm:text-sm">EvalFlow</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-[#0F172A]/5 border border-[#F1F5F9] p-5 sm:p-8 md:p-10">

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-sora font-bold text-xs sm:text-sm transition-all duration-300 ${step === "EMAIL" ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25" : "bg-[#2563EB] text-white"
              }`}>
              1
            </div>
            <div className={`w-8 sm:w-12 h-0.5 transition-all duration-300 ${step === "OTP" ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
              }`} />
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-sora font-bold text-xs sm:text-sm transition-all duration-300 ${step === "OTP" ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25" : "bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]"
              }`}>
              2
            </div>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="font-sora font-bold text-xl sm:text-2xl md:text-3xl text-[#0F172A] mb-2">
              {step === "EMAIL" ? "Welcome back" : "Verify your email"}
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed px-1 sm:px-0">
              {step === "EMAIL"
                ? "Enter your email to receive a secure verification code"
                : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>

          {/* EMAIL STEP */}
          {step === "EMAIL" ? (
            <div className="space-y-4 sm:space-y-5 animate-fade-in">

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-3.5 sm:pr-4 py-3 sm:py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={sendOtp}
                disabled={loading}
                className="group relative w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="truncate">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="truncate">Continue</span>
                      <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

            </div>
          ) : (

            /* OTP STEP */
            <div className="space-y-4 sm:space-y-5 animate-fade-in">

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="otp-input w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-[#CBD5E1] text-center text-xl sm:text-2xl font-sora font-bold focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
                />
                <p className="mt-2 text-xs text-[#64748B] text-center">
                  Didn't receive it? <button onClick={() => setStep("EMAIL")} className="text-[#2563EB] font-semibold hover:underline">Resend code</button>
                </p>
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading || otp.length < 6}
                className="group relative w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="truncate">Verifying...</span>
                    </>
                  ) : (
                    <span className="truncate">Verify & Continue</span>
                  )}
                </span>
              </button>

              <button
                onClick={() => setStep("EMAIL")}
                className="w-full py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                Back to email
              </button>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 sm:mt-6 flex items-start sm:items-center gap-2 p-3 sm:p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm animate-fade-in">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center px-2 sm:px-0">
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Secure, encrypted connection. By continuing, you agree to our <a href="#" className="text-[#2563EB] hover:underline">Terms</a> and <a href="#" className="text-[#2563EB] hover:underline">Privacy Policy</a>.
          </p>
        </div>

      </div>
    </div>
  );
}