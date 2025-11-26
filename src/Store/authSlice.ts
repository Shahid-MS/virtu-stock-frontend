import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  roles: string[];
}

interface DecodedToken {
  sub: string;
  name: string;
  roles: string[];
  exp: number;
}

let initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  name: undefined,
  email: undefined,
  roles: [],
};

const storedToken = localStorage.getItem("virtustock-token");
if (storedToken) {
  try {
    const decoded: DecodedToken = jwtDecode(storedToken);
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp > now) {
      initialState = {
        token: storedToken,
        isAuthenticated: true,
        name: decoded.name,
        email: decoded.sub,
        roles: decoded.roles,
      };
    } else {
      localStorage.removeItem("virtustock-token");
    }
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("virtustock-token");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      const decoded: DecodedToken = jwtDecode(action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.name = decoded.name;
      state.email = decoded.sub;
      state.roles = decoded.roles;
      localStorage.setItem("virtustock-token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.name = undefined;
      state.email = undefined;
      state.roles = [];
      localStorage.removeItem("virtustock-token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
