import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** LOGIN **/
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
      return { token: data.token, rememberMe };
    } catch {
      return rejectWithValue("Network error: Unable to reach the server");
    }
  }
);

const initialState = {
  loading: false,
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /** Re-hydrate */
    rehydrateFromStorage(state) {
      const token = localStorage.getItem("token");
      state.token = token;
      state.isAuthenticated = !!token;
    },
    /** Logout */
    logout(state) {
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
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

export default authSlice.reducer;
