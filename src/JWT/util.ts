import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp: number;
  sub?: string;
  roles?: string[];
  iat?: number;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    return jwtDecode(token) as DecodedToken;
  } catch {
    return null;
  }
};
