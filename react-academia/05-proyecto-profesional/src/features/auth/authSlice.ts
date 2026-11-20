import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Solo el token. El usuario NO va aquí: se pide a la API con /me (useCurrentUser)
type AuthState = {
  token: string | null; // null = nadie ha entrado
};

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // action.payload = el token
    loggedIn: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload,
    }),
    loggedOut: (state) => ({
      ...state,
      token: null,
    }),
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
