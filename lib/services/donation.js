// lib/services/donation.js
import { api } from "../api";

export const donationService = {
  // Get all campaigns
  getCampaigns: (type) =>
    api.get(
      type ? `/donations/campaigns?type=${type}` : "/donations/campaigns"
    ),

  // Get single campaign
  getCampaignById: (id) => api.get(`/donations/campaigns/${id}`),

  // Make a donation
  donate: (data) => api.post("/donations", data),
};
