// lib/services/adoption.js
import { api } from "../api";

export const adoptionService = {
  // Get all adoption listings
  getAll: () => api.get("/adoptions"),

  // Get single listing by ID
  getById: (id) => api.get(`/adoptions/${id}`),

  // Create new listing (with images)
  create: async (data, images) => {
    const formData = new FormData();

    // Add form fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Add images
    images.forEach((image, index) => {
      formData.append("images", {
        uri: image.uri,
        type: "image/jpeg",
        name: `cat_${index}.jpg`,
      });
    });

    return api.upload("/adoptions", formData);
  },

  // Submit adoption request
  submitRequest: (listingId, data) =>
    api.post(`/adoptions/${listingId}/request`, data),

  // Approve or reject request (for listing owner)
  updateRequestStatus: (requestId, status) =>
    api.put(`/adoptions/requests/${requestId}`, { status }),
};
