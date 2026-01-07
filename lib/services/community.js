// lib/services/community.js
import { api } from "../api";

export const communityService = {
  // Posts
  getPosts: (category) =>
    api.get(
      category ? `/community/posts?category=${category}` : "/community/posts"
    ),

  createPost: async (data, image) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("content", data.content);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg",
        name: "post_image.jpg",
      });
    }

    return api.upload("/community/posts", formData);
  },

  // Comments
  getComments: (postId) => api.get(`/community/posts/${postId}/comments`),

  addComment: (postId, content) =>
    api.post(`/community/posts/${postId}/comments`, { content }),

  // Likes
  likePost: (postId) => api.post(`/community/posts/${postId}/like`),

  // Stories
  getStories: () => api.get("/community/stories"),

  createStory: async (data, image) => {
    const formData = new FormData();
    formData.append("type", data.type);

    if (data.content) formData.append("content", data.content);
    if (data.backgroundColor)
      formData.append("backgroundColor", data.backgroundColor);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg",
        name: "story_image.jpg",
      });
    }

    return api.upload("/community/stories", formData);
  },
};
