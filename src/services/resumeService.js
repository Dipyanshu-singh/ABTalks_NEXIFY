import {
  API_BASE_URL,
  API_ENDPOINTS,
} from "../config/api";


// ================================
// UPLOAD RESUME
// ================================

export async function uploadResume(file) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("resume", file);

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.UPLOAD_RESUME}`,
    {
      method: "POST",

      headers: {
        // DO NOT add Content-Type here.
        // Browser automatically sets multipart/form-data.

        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Resume upload failed"
    );
  }

  return data;
}