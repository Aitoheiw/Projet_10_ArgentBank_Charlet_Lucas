const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1";

/** LOGIN */
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Login failed");
  }

  const data = await res.json();
  return data.body;
}

/** PROFILE (GET) */
export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return {
    email: data.body.email,
    firstName: data.body.firstName,
    lastName: data.body.lastName,
    userName: data.body.userName,
    createdAt: data.body.createdAt,
    updatedAt: data.body.updatedAt,
    id: data.body.id,
  };
}

/** PROFILE (PUT username) */
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
