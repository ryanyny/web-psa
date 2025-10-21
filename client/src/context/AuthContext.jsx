import { createContext, useState, useEffect } from "react"
import { auth } from "../http"

const AuthContext = createContext({ user: null, loading: true })

// --- Component provider autentikasi ---
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fungsi untuk mengambil data user saat ini
        const fetchMe = async () => {
            try {
                const res = await auth.me()
                setUser(res.data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchMe()
    }, [])

    // Fungsi untuk proses login
    const login = async (data) => {
        const res = await auth.login(data)
        setUser(res.data.user)

        return res
    }

    // Fungsi untuk proses registrasi
    const register = async (data) => {
        const res = await auth.register(data)
        setUser(res.data.user)

        return res
    }

    // Fungsi untuk proses logout
    const logout = async () => {
        await auth.logout()
        setUser(null)
    }

    // Menampilkan loading screen / spinner selama proses autentikasi awal
    if (loading) return <div className="flex justify-center p-10">Loading...</div>
    
    // Menyediakan nilai context (state & fungsi) ke seluruh children
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext