// src/api/apiService.js
import apiClient from "./apiClient.js";

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllPublicBlogs = async () => {
  try {
    // This calls the GET /api/blogs endpoint
    const response = await apiClient.get("/blogs");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createBlog = async (blogData) => {
  try {
    // We use FormData because we are sending a file (multipart/form-data)
    const response = await apiClient.post("/blogs", blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyBlogs = async () => {
  try {
    const response = await apiClient.get("/blogs/myblogs/all");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/blogs/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await apiClient.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    // We use FormData to handle potential image updates
    const response = await apiClient.put(`/blogs/${id}`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addCommentToBlog = async (blogId, commentData) => {
  try {
    // This calls the POST /api/blogs/:id/comments endpoint
    const response = await apiClient.post(
      `/blogs/${blogId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// You can add a function to verify user session later if needed
// export const checkAuthStatus = async () => {
//   try {
//     const response = await apiClient.get("/auth/status");
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
