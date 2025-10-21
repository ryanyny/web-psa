import axios from "axios"

// Header default yang diinginkan di setiap request (menerima JSON)
const defaultHeader = {
    Accept: "application/json",
}

// --- Konfigurasi instance axios utama ---
export const axiosWrapper = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: { ...defaultHeader },
})

// Interceptor ini dijalankan sebelum setiap request dikirim
axiosWrapper.interceptors.request.use((config) => {
    // Jika data adalah FormData, hapus Content-Type
    // Browser akan secara otomatis mengatur Content-Type menjadi 'multipart/form-data'
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"]
    } else {
        config.headers["Content-Type"] = "application/json"
    }
    
    return config
})

// Interceptor ini dijalankan setelah setiap respons diterima
axiosWrapper.interceptors.response.use(
    // Handler sukses: Cukup kembalikan respons
    (res) => res,
    (err) => {
        // Logika re-autentikasi otomatis (handling 401 unauthorized)
        if (err.response?.status === 401) {
            // Jika server merespons 401 (unauthorized / token kedaluwarsa) arahkan pengguna ke halaman login
            window.location.href = "/login"
        }

        return Promise.reject(err)
    }
)