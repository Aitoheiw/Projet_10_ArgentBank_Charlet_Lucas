const API_URL = "http://localhost:3001/api/v1";

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
