import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "https://neuroversebe.onrender.com/api/";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const blogAPI = {
	// Posts
	getPosts: () => api.get("/posts/"),
	getPost: (slug) => api.get(`/posts/${slug}/`),
	createPost: (data) => api.post("/posts/", data),
	updatePost: (slug, data) => api.put(`/posts/${slug}/`, data),
	deletePost: (slug) => api.delete(`/posts/${slug}/`),

	// Categories
	getCategories: () => api.get("/categories/"),

	// Featured posts
	getFeaturedPosts: () => api.get("/featured/"),
};

export default api;
