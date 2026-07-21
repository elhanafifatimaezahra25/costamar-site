import axios from "axios";

const TOKEN_KEY = "costamar_admin_token";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function login(email: string, password: string): Promise<void> {
  const { data } = await axios.post<{ token: string }>(`${baseURL}/api/auth/login`, {
    email,
    password,
  });
  setToken(data.token);
}

export function logout() {
  clearToken();
  window.location.href = "/admin/login";
}
