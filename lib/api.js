// lib/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ganti dengan IP address komputer Anda jika testing di device fisik
// Gunakan localhost jika testing di Android emulator: 10.0.2.2
// Gunakan localhost jika testing di iOS simulator: localhost
const API_URL = "http://192.168.0.120:3000/api";

class ApiClient {
  constructor() {
    this.baseUrl = API_URL;
    this.token = null;
  }

  async init() {
    // Load token from storage on app start
    try {
      const session = await AsyncStorage.getItem("session");
      if (session) {
        const parsed = JSON.parse(session);
        this.token = parsed.token;
      }
    } catch (e) {
      console.log("Failed to load session:", e);
    }
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // GET request
  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  // POST request
  post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // PUT request
  put(endpoint, body) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  // DELETE request
  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // Multipart form data (for file uploads)
  async upload(endpoint, formData) {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    return response.json();
  }
}

export const api = new ApiClient();
export { API_URL };
