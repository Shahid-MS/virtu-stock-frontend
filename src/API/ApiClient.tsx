import { store } from "@/Store";

import axios from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  // baseURL: "http://localhost:8081/api",
  baseURL: "https://virtustock-latest.onrender.com",
  timeout: 5000,
});
export const slowApiClient = axios.create({
  baseURL: "https://virtustock-latest.onrender.com",
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error(error.response.data?.message, {
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 10%, var(--background))",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
      });
    }
    return Promise.reject(error);
  }
);

slowApiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

slowApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      if (!error.response) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error(error.response.data?.message ?? "Something went wrong");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
