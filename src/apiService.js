// src/api/apiService.js

const API_URL = "http://localhost:3001/api/v1";

/**
 * Appelle l’API pour se connecter avec les identifiants
 * Ne gère pas le stockage, juste la requête.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} token
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Échec de la connexion");
  }

  return data.body.token;
}
