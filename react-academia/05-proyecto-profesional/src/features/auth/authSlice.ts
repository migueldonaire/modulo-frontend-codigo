import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./authService";

type AuthState = {
  token: string | null;
  user: User | null; // null = nadie ha entrado
};

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loggedOut(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
