import { toast } from "react-toastify";
import { AuthResponse } from "../types";
import axios from "./HttpService";

export async function login(username: string, password: string) {
  const { data, status } = await axios.post<AuthResponse>(`/auth/signin`, {
    username,
    password,
  });

  if (status === 200) {
    localStorage.setItem(
      "quoots-user",
      JSON.stringify({
        ...data.user,
        token: data.token,
      })
    );
  } else {
    toast.error(data.message);
  }
}

export function logout() {
  localStorage.removeItem("quoots-user");
}

export async function signup(username: string, password: string) {
  const { data, status } = await axios.post<AuthResponse>(`/auth/signup`, {
    username,
    password,
  });

  if (status === 200) {
    localStorage.setItem(
      "quoots-user",
      JSON.stringify({
        ...data.user,
        token: data.token,
      })
    );
  } else {
    toast.error(data.message);
  }
}

export function loadUser() {
  const user = localStorage.getItem("quoots-user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
