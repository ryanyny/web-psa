import { axiosWrapper } from "./axiosWrapper.js"

// --- Service: Upload file ---
export const upload = {
    image: (formData) => axiosWrapper.post("api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    }),
}

// --- Service: Autentikasi ---
export const auth = {
    register: (payload) => axiosWrapper.post("/api/auth/register", payload),
    login: (payload) => axiosWrapper.post("/api/auth/login", payload),
    logout: () => axiosWrapper.post("/api/auth/logout"),
    me: () => axiosWrapper.get("/api/auth/me"),
}

// --- Service: Post ---
export const posts = {
    getAll: () => axiosWrapper.get("/api/posts"),
    getById: (id) => axiosWrapper.get(`/api/posts/${id}`),
    create: (payload) => axiosWrapper.post("/api/posts", payload),
    update: (id, payload) => axiosWrapper.put(`/api/posts/${id}`, payload),
    remove: (id) => axiosWrapper.delete(`/api/posts/${id}`),
}

// --- Service: Kategori ---
export const categories = {
    getAll: () => axiosWrapper.get("/api/categories"),
    getPosts: (id) => axiosWrapper.get(`/api/categories/${id}/posts`),
}

// --- Service: Komentar ---
export const comments = {
    getCommentsByPost: (postId) => axiosWrapper.get(`/api/comments/${postId}/comments`),
    create: (postId, payload) => axiosWrapper.post(`/api/comments/${postId}/comments`, payload),
    update: (id, data) => axiosWrapper.put(`/api/comments/${id}`, data),
    remove: (id) => axiosWrapper.delete(`/api/comments/${id}`),
}

// --- Service: Like ---
export const likes = {
    get: (postId) => axiosWrapper.get(`/api/posts/${postId}/likes`),
    toggle: (postId) => axiosWrapper.post(`/api/posts/${postId}/likes/toggle`),
}

// --- Service: Bookmark ---
export const bookmarks = {
    getSummary: (postId) => axiosWrapper.get(`/api/posts/${postId}/bookmarks`),
    toggle: (postId) => axiosWrapper.post(`/api/posts/${postId}/bookmarks/toggle`),
    getUserBookmarks: () => axiosWrapper.get(`/api/posts/user/bookmarks`),  
}

// API applicants
export const applicants = {
    getAll: () => axiosWrapper.get("/api/applicants"),
    getById: (id) => axiosWrapper.get(`/api/applicants/${id}`),
    create: (payload) => axiosWrapper.post("/api/applicants", payload),
    // update: (id, payload) => axiosWrapper.put(`/api/applicants/${id}`, payload), // Uncomment jika endpoint update ada
    remove: (id) => axiosWrapper.delete(`/api/applicants/${id}`),
}

export const email = {
    checkEmail: (email) => axiosWrapper.post("/api/check-email",{email}),
}

export const admin = {
    stats: () => axiosWrapper.get("/api/admin/stats"),
    getUsers: () => axiosWrapper.get("/api/admin/users"),
    updateUserRole: (id, role) => axiosWrapper.put(`/api/admin/users/${id}/role`, { role }),
    deleteUser: (id) => axiosWrapper.delete(`/api/admin/users/${id}`),

    getPosts: () => axiosWrapper.get("/api/admin/posts"),
    deletePost: (id) => axiosWrapper.delete(`/api/admin/posts/${id}`),
}

export default { auth, posts, upload, categories, comments, likes, bookmarks, applicants, email, admin }