// redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// This thunk checks if the user is logged in by calling the backend
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    const res = await fetch("http://localhost:1337/auth/user/check", {
      credentials: "include", // important for HttpOnly cookies
    });
    if (!res.ok) {
      throw new Error("Not authenticated");
    }

    return await res.json(); // Expect: { username, role, ... }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: {},
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.username = action.payload;
      state.loading = false;
    })
    .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.username = null;
      });

  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
