import { createContext, useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import { auth } from "../http/index.js"

const AuthContext = createContext({ user: null, loading: true })

// --- Component provider autentikasi ---
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchMe = useCallback(async () => {
        try {
            const res = await auth.me()
            setUser(res.data)
        } catch (error) {
            console.error("Error fetching user data: ", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchMe()
    }, [fetchMe])

    // Fungsi untuk proses login
    const login = async (data) => {
        try {
            const res = await auth.login(data)
            const userData = res.data.user
            setUser(userData)
            toast.success("Login berhasil!")

            return userData
        } catch (error) {
            const message = error.response?.data?.message || "Login gagal!"
            toast.error(message)
            throw new Error(message)
        }
    }

    // Fungsi untuk proses registrasi
    const register = async (data) => {
        try {
            const res = await auth.register(data)
            const userData = res.data.user
            setUser(userData)
            toast.success("Registrasi berhasil!")

            return userData
        } catch (error) {
            const message = error.response?.data?.message || "Registrasi gagal!"
            toast.error(message)
            throw new Error(message)
        }
    }

    // Fungsi untuk proses logout
    const logout = async () => {
        try {
            await auth.logout()
            setUser(null)
            toast.success("Logout berhasil!")
        } catch (error) {
            console.error("Error during logout: ", error)
            toast.error("Logout gagal!")
            throw error
        }
    }

    // Menyediakan nilai context (state dan fungsi) ke seluruh children
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext