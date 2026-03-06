import { createContext, useContext, useState, useEffect } from "react";

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {

  const [interviewType, setInterviewType] = useState(() =>
    localStorage.getItem("interviewType")
  );

  const [company, setCompany] = useState(() =>
    localStorage.getItem("company")
  );

  const [sessionId, setSessionId] = useState(() =>
    localStorage.getItem("sessionId")
  );

  // Persist values
  useEffect(() => {
    if (interviewType)
      localStorage.setItem("interviewType", interviewType);
  }, [interviewType]);

  useEffect(() => {
    if (company)
      localStorage.setItem("company", company);
  }, [company]);

  useEffect(() => {
    if (sessionId)
      localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  const resetInterview = () => {
    setInterviewType(null);
    setCompany(null);
    setSessionId(null);

    localStorage.removeItem("interviewType");
    localStorage.removeItem("company");
    localStorage.removeItem("sessionId");
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewType,
        setInterviewType,
        company,
        setCompany,
        sessionId,
        setSessionId,
        resetInterview
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewContext = () => {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error("useInterviewContext must be used inside provider");
  return ctx;
};
