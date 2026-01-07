// lib/services/notification.js
import { api } from "../api";

export const notificationService = {
  // Get all notifications
  getAll: () => api.get("/notifications"),

  // Mark notification as read
  markRead: (id) => api.put(`/notifications/${id}/read`),
};
