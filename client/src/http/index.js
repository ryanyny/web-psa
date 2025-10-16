import { axiosWrapper } from "./axiosWrapper.js"

// API otentikasi user
export const auth = {
    register: (payload) => axiosWrapper.post("/api/auth/register", payload),
    login: (payload) => axiosWrapper.post("/api/auth/login", payload),
    logout: () => axiosWrapper.post("/api/auth/logout"),
    me: () => axiosWrapper.get("/api/auth/me"),
}

// API posts
export const posts = {
    getAll: () => axiosWrapper.get("/api/posts"),
    getById: (id) => axiosWrapper.get(`/api/posts/${id}`),
    create: (payload) => axiosWrapper.post("/api/posts", payload),
    update: (id, payload) => axiosWrapper.put(`/api/posts/${id}`, payload),
    remove: (id) => axiosWrapper.delete(`/api/posts/${id}`),
}

// API applicants
export const applicants = {
    getAll: () => axiosWrapper.get("/api/applicants"),
    getById: (id) => axiosWrapper.get(`/api/applicants/${id}`),
    create: (payload) => axiosWrapper.post("/api/applicants", payload),
    // update: (id, payload) => axiosWrapper.put(`/api/applicants/${id}`, payload), // Uncomment jika endpoint update ada
    remove: (id) => axiosWrapper.delete(`/api/applicants/${id}`),
}
export default { auth, posts, applicants }