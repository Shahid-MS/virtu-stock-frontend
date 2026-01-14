import apiClient from "@/API/ApiClient";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  roles: string[];
  profilePicUrl?: string;
}

interface DecodedToken {
  sub: string;
  name: string;
  roles: string[];
  exp: number;
  profilePicUrl: string;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  name: undefined,
  email: undefined,
  roles: [],
  profilePicUrl: undefined,
};

export const useAuthInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("virtustock-token");
      if (!token) return;
      try {
        const refreshRes = await apiClient.post("/user/refresh-token", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newToken = refreshRes.data["virtustock-token"];
        dispatch(login({ token: newToken }));
      } catch {
        localStorage.removeItem("virtustock-token");
        dispatch(logout());
      }
    };
    init();
  }, []);
};

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
      state.profilePicUrl = decoded.profilePicUrl;
      localStorage.setItem("virtustock-token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.name = undefined;
      state.email = undefined;
      state.profilePicUrl = undefined;
      state.roles = [];
      localStorage.removeItem("virtustock-token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
