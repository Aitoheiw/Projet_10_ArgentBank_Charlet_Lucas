// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3001/api/v1";

/** LOGIN */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let message = "Identifiants invalides";
        try {
          const err = await res.json();
          if (err && typeof err.message === "string") message = err.message;
        } catch {}
        return rejectWithValue(message);
      }

      const data = await res.json();

      const token = data?.body?.token ?? data?.token;
      if (!token)
        return rejectWithValue("Token manquant dans la réponse du serveur");

      console.log("[authSlice] loginUser token:", token);
      return { token, rememberMe };
    } catch {
      return rejectWithValue("Network error: Unable to reach the server");
    }
  }
);

/** GET PROFILE */
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("No token");

      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
          const err = await res.json();
          if (err?.message) message = err.message;
        } catch {}
        return rejectWithValue(message);
      }

      const data = await res.json();
      const user = data?.body ?? data;
      console.log("[authSlice] fetchProfile user:", user);
      return user;
    } catch {
      return rejectWithValue("Network error: Unable to reach the server");
    }
  }
);

const initialState = {
  loading: false,
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rehydrateFromStorage(state) {
      const token = localStorage.getItem("token");
      state.token = token;
      state.isAuthenticated = !!token;
    },
    logout(state) {
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        if (action.payload.rememberMe) {
          localStorage.setItem("token", action.payload.token);
        } else {
          localStorage.removeItem("token");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error =
          action.payload ?? action.error?.message ?? "Unknown error";
      })

      // FETCH PROFILE
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // { id, email, firstName, lastName, ... }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          action.payload ?? action.error?.message ?? "Unknown error";
      });
  },
});

export const { rehydrateFromStorage, logout } = authSlice.actions;
export const selectIsAuth = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
