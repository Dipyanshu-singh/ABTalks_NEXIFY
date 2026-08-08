import {
  API_BASE_URL,
  API_ENDPOINTS,
} from "../config/api";


// ================================
// START INTERVIEW
// ================================

export async function startInterview() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.START_INTERVIEW}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        // Backend can use these later
        // to generate personalized questions.

        interviewType: "technical",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not start interview"
    );
  }

  return data;
}


// ================================
// GET QUESTION
// ================================

export async function getInterviewQuestion(
  interviewId
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.GET_QUESTION}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        interviewId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not get question"
    );
  }

  return data;
}


// ================================
// SUBMIT ANSWER
// ================================

export async function submitAnswer(
  interviewId,
  questionId,
  answer
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.SUBMIT_ANSWER}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        interviewId,
        questionId,
        answer,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not submit answer"
    );
  }

  return data;
}


// ================================
// END INTERVIEW
// ================================

export async function endInterview(
  interviewId
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.END_INTERVIEW}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        interviewId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not end interview"
    );
  }

  return data;
}