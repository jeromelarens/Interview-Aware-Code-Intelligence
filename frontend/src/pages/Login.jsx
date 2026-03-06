import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
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

      setStep("OTP");
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

      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
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
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-6 relative overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Interview Access
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Secure authentication via OTP verification
            </p>
          </div>

          {/* EMAIL STEP */}
          {step === "EMAIL" ? (
            <div className="space-y-6 animate-[fadeIn_0.6s_ease_forwards]">

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Gmail Address
                </label>

                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all text-sm"
                />
              </div>

              <button
                onClick={sendOtp}
                className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-400 to-purple-500 text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

            </div>
          ) : (

            /* OTP STEP */
            <div className="space-y-6 animate-[fadeIn_0.6s_ease_forwards]">

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Enter OTP
                </label>

                <input
                  type="text"
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all text-sm tracking-widest text-center"
                />
              </div>

              <button
                onClick={verifyOtp}
                className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

        </div>

      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </div>
  );
}
