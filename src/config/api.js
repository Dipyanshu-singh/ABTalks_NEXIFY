// ==========================================
// BACKEND API CONFIGURATION
// ==========================================

// Change this ONE value when your backend URL is ready.

export const API_BASE_URL =
  "http://localhost:5000/api";


// ==========================================
// API ENDPOINTS
// ==========================================

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  // Resume
  UPLOAD_RESUME: "/resume/upload",

  // Interview
  START_INTERVIEW: "/interview/start",
  GET_QUESTION: "/interview/question",
  SUBMIT_ANSWER: "/interview/answer",
  END_INTERVIEW: "/interview/end",

  // Results
  GET_RESULTS: "/results",

  // Recruiter
  CANDIDATES: "/recruiter/candidates",
};