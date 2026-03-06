import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import InterviewType from "./pages/InterviewType";
import CompanySelect from "./pages/CompanySelect";
import Interview from "./pages/Interview";
import Result from "./pages/Result";

import { InterviewProvider } from "./context/InterviewContext";

export default function App() {
  return (
    <InterviewProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Interview Flow */}
          <Route path="/type" element={<InterviewType />} />
          <Route path="/company" element={<CompanySelect />} />
          <Route path="/interview" element={<Interview />} />

          {/* ✅ RESULT ROUTE FIX */}
          <Route path="/result/:sessionId" element={<Result />} />


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </InterviewProvider>
  );
}
