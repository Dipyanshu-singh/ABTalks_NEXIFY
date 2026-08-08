import {
  API_BASE_URL,
  API_ENDPOINTS,
} from "../config/api";

// ================================
// LOGIN
// ================================

export async function loginUser(email, password) {
  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Backend can return token here
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}


// ================================
// SIGN UP
// ================================

export async function registerUser(
  name,
  email,
  password
) {
  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.REGISTER}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}


// ================================
// LOGOUT
// ================================

export function logoutUser() {
  localStorage.removeItem("token");
}


// ================================
// GET TOKEN
// ================================

export function getAuthToken() {
  return localStorage.getItem("token");
}