// lib/services/lost.js
import { api } from "../api";

export const lostService = {
  // Get all lost reports
  getAll: () => api.get("/lost"),

  // Get single report
  getById: (id) => api.get(`/lost/${id}`),

  // Create new lost report
  create: async (data, images) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    images.forEach((image, index) => {
      formData.append("images", {
        uri: image.uri,
        type: "image/jpeg",
        name: `lost_${index}.jpg`,
      });
    });

    return api.upload("/lost", formData);
  },

  // Mark as found (by owner)
  markAsFound: (id) => api.put(`/lost/${id}/found`),

  // Submit found report (by someone who found it)
  submitFoundReport: (lostId, data) => api.post(`/lost/${lostId}/report`, data),
};
