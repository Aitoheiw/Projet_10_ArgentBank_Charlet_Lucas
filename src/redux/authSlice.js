import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      // ERREURS HTTP on REJECT
      if (!res.ok) {
        let message = "Identifiants invalides";
        try {
          const err = await res.json();
          if (err && typeof err.message === "string") message = err.message;
        } catch {}
        return rejectWithValue(message);
      }

      const data = await res.json();
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        token: data.token,
      };
    } catch {
      // Erreur réseau (serveur down, CORS, etc.)
      return rejectWithValue("Network error: Unable to reach the server");
    }
  }
);

const initialState = { loading: false, user: null, token: null, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        console.log(action.error.message);
        state.error =
          action.payload ?? action.error?.message ?? "Unknown error";
      });
  },
});
export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
