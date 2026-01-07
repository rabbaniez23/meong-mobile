// lib/services/chat.js
import { api } from "../api";

export const chatService = {
  // Get all chat rooms
  getRooms: () => api.get("/chat/rooms"),

  // Initiate or get existing chat room
  initiateChat: (targetUserId, context) =>
    api.post("/chat/rooms", { targetUserId, context }),

  // Get messages in a room
  getMessages: (roomId) => api.get(`/chat/rooms/${roomId}/messages`),

  // Send message
  sendMessage: (roomId, content) =>
    api.post(`/chat/rooms/${roomId}/messages`, { content }),
};
