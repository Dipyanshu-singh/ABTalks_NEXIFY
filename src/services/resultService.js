import {
  API_BASE_URL,
  API_ENDPOINTS,
} from "../config/api";


// ================================
// GET USER RESULTS
// ================================

export async function getResults() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.GET_RESULTS}`,
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
      data.message || "Could not fetch results"
    );
  }

  return data;
}