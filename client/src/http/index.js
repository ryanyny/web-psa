import { axiosWrapper } from "./axiosWrapper.js"

// API upload gambar (konten blog)
export const upload = {
    image: (formData) =>
        axiosWrapper.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
}

// API otentikasi user
export const auth = {
    register: (payload) => axiosWrapper.post("/api/auth/register", payload),
    login: (payload) => axiosWrapper.post("/api/auth/login", payload),
    logout: () => axiosWrapper.post("/api/auth/logout"),
    me: () => axiosWrapper.get("/api/auth/me"),
}

// API blog
export const posts = {
    getAll: () => axiosWrapper.get("/api/posts"),
    getById: (id) => axiosWrapper.get(`/api/posts/${id}`),
    create: (payload) => axiosWrapper.post("/api/posts", payload),
    update: (id, payload) => axiosWrapper.put(`/api/posts/${id}`, payload),
    remove: (id) => axiosWrapper.delete(`/api/posts/${id}`),
}

// API kategori
export const categories = {
    getAll: () => axiosWrapper.get("/api/categories"),
    getPosts: (id) => axiosWrapper.get(`/api/categories/${id}/posts`), 
}

// API Komentar (Revisi di sini)
export const comments = {
    getCommentsByPost: (postId) => axiosWrapper.get(`/api/comments/${postId}/comments`),
    
    // Fungsi CREATE yang Fleksibel: payload = { content, parentId? }
    // Memungkinkan untuk komentar utama atau balasan
    create: (postId, payload) => axiosWrapper.post(`/api/comments/${postId}/comments`, payload),
    
    update: (id, data) => axiosWrapper.put(`/api/comments/${id}`, data),
    remove: (id) => axiosWrapper.delete(`/api/comments/${id}`),
}

export const likes = {
    get: (postId) => axiosWrapper.get(`/api/posts/${postId}/likes`),
    toggle: (postId) => axiosWrapper.post(`/api/posts/${postId}/likes/toggle`),
}

export default { auth, posts, upload, categories, comments, likes }