import {
  PRODUCT_COMPANY_QUESTION_MAP,
  PRODUCT_PROBLEM_QUESTION_BANK,
  SERVICE_COMPANY_QUESTION_MAP,
  SERVICE_PROBLEM_QUESTION_BANK
} from "../constants/companyQuestions.constants.js";

/**
 * Generate questions ONLY
 */
export const generateQuestions = (interviewType, company) => {
  const companyMap =
    interviewType === "product"
      ? PRODUCT_COMPANY_QUESTION_MAP
      : SERVICE_COMPANY_QUESTION_MAP;

  const problemBank =
    interviewType === "product"
      ? PRODUCT_PROBLEM_QUESTION_BANK
      : SERVICE_PROBLEM_QUESTION_BANK;

  const titles = companyMap[company];

  if (!titles) {
    throw new Error(`No questions configured for ${company}`);
  }

  return titles.map((title, index) => ({
    id: index + 1,
    title,
    text: problemBank[title]
  }));
};