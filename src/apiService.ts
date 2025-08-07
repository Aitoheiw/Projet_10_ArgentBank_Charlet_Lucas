const API_URL = "http://localhost:3001/api/v1";

/**
 * Sends a POST request to the login endpoint with the provided email and password.
 * Throws an error if the login attempt is unsuccessful.
 *
 * @param email - The email address of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns A promise that resolves to a string representing the authentication token.
 * @throws An error if the login request fails.
 */

export async function loginUser(
  email: string,
  password: string
): Promise<string> {
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
