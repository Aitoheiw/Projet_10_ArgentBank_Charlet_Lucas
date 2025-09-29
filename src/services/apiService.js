// src/services/apiService.js
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1";

/**
 * Met à jour UNIQUEMENT le userName via PUT /user/profile
 * @param {string} token - JWT Bearer
 * @param {string} userName - nouveau pseudo
 * @returns {Promise<{firstName:string,lastName:string,userName:string}>}
 */
export async function putUserName(token, userName) {
  const res = await fetch(`${API_BASE}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`PUT /user/profile failed (${res.status}) ${text}`);
  }

  const data = await res.json();
  return data.body;
}
