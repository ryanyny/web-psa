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

export const comments = {
    getCommentsByPost: (postId) => axiosWrapper.get(`/api/comments/${postId}/comments`),
    create: (postId, content) => axiosWrapper.post(`/api/comments/${postId}/comments`, { content }),
    remove: (id) => axiosWrapper.delete(`/api/comments/${id}`),
}

export default { auth, posts, upload, categories, comments }