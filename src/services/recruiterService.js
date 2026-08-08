import {
  API_BASE_URL,
  API_ENDPOINTS,
} from "../config/api";


// ================================
// GET CANDIDATES
// ================================

export async function getCandidates() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not fetch candidates"
    );
  }

  return data;
}