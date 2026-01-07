// lib/auth.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, API_URL } from "./api";

const AUTH_URL = API_URL.replace("/api", "/api/auth");

class AuthService {
  async signUp(email, password, name) {
    const response = await fetch(`${AUTH_URL}/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Sign up failed");
    }

    // Save session
    if (data.token) {
      await this.saveSession(data);
    }

    return data;
  }

  async signIn(email, password) {
    const response = await fetch(`${AUTH_URL}/sign-in/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Sign in failed");
    }

    // Save session
    if (data.token) {
      await this.saveSession(data);
    }

    return data;
  }

  async signOut() {
    try {
      await fetch(`${AUTH_URL}/sign-out`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${api.token}`,
        },
      });
    } catch (e) {
      // Ignore sign out errors
    }

    await this.clearSession();
  }

  async getSession() {
    try {
      const session = await AsyncStorage.getItem("session");
      if (session) {
        return JSON.parse(session);
      }
    } catch (e) {
      console.log("Failed to get session:", e);
    }
    return null;
  }

  async saveSession(data) {
    try {
      await AsyncStorage.setItem("session", JSON.stringify(data));
      api.setToken(data.token);
    } catch (e) {
      console.log("Failed to save session:", e);
    }
  }

  async clearSession() {
    try {
      await AsyncStorage.removeItem("session");
      api.setToken(null);
    } catch (e) {
      console.log("Failed to clear session:", e);
    }
  }

  async getCurrentUser() {
    return api.get("/users/me");
  }
}

export const authService = new AuthService();
