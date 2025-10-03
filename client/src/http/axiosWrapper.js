import axios from "axios"

// Header default yang selalu dibawa di setiap request
const defaultHeader = {
    Accept: "application/json",
}

// Buat instance axios khusus
export const axiosWrapper = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: { ...defaultHeader },
})

// Cek sebelum request dikirim
axiosWrapper.interceptors.request.use((config) => {
    // Jika data yang dikirim berupa FormData (file)
    if (config.data instanceof FormData) {
        // Hapus Content-Type (browser otomatis isi "multipart/form-data")
        delete config.headers["Content-Type"]
    } else {
        // Default menggunakan JSON jika bukan FormData
        config.headers["Content-Type"] = "application/json"
    }

    return config
})