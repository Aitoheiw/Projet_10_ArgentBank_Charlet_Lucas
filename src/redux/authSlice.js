// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { putUserName } from "../services/apiService";

const BASE_URL = "http://localhost:3001/api/v1";

/** LOGIN */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
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

      const res = await fetch(`${BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          return rejectWithValue("Unauthorized (401) – please login again");
        }
        let message = `HTTP ${res.status}`;
        try {
          const err = await res.json();
          if (err?.message) message = err.message;
        } catch {}
        return rejectWithValue(message);
      }

      const data = await res.json();
      const user = data?.body ?? data;
      return user;
    } catch {
      return rejectWithValue("Network error: Unable to reach the server");
    }
  }
);

export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  async ({ userName }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("No token");
      const body = await putUserName(token, userName);
      return body; // { firstName, lastName, userName }
    } catch (e) {
      return rejectWithValue(e?.message || "Failed to update username");
    }
  }
);

const initialState = {
  loading: false,
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,

  updatingUsername: false,
  updateUsernameError: null,
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
      })

      // UPDATE USERNAME
      .addCase(updateUserName.pending, (state) => {
        state.updatingUsername = true;
        state.updateUsernameError = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.updatingUsername = false;
        // merge propre: on ne touche qu’au user
        if (state.user) {
          state.user.firstName = action.payload.firstName;
          state.user.lastName = action.payload.lastName;
          state.user.userName = action.payload.userName;
        } else {
          state.user = action.payload;
        }
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.updatingUsername = false;
        state.updateUsernameError =
          action.error?.message || "Failed to update username";
        state.updateUsernameError =
          action.payload ??
          action.error?.message ??
          "Failed to update username";
      });
  },
});

export const { rehydrateFromStorage, logout } = authSlice.actions;
export const selectIsAuth = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export const selectUpdatingUsername = (state) => state.auth.updatingUsername;
export const selectUpdateUsernameError = (state) =>
  state.auth.updateUsernameError;

export default authSlice.reducer;
