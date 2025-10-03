import { createContext, useState, useEffect } from "react"
import { auth } from "../http"

// Buat Context Auth, default value: user null (belum login), loading true (mengecek login)
const AuthContext = createContext({ user: null, loading: true })

// Provider untuk supply state auth ke seluruh app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Mengecek apakah user mempunyai session/token valid
    useEffect(() => {
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

    // Fungsi login
    const login = async (data) => {
        const res = await auth.login(data)
        setUser(res.data)

        return res
    }

    // Fungsi register
    const register = async (data) => {
        const res = await auth.register(data)
        setUser(res.data)

        return res
    }

    // Fungsi logout
    const logout = async () => {
        await auth.logout()
        setUser(null)
    }

    return (
        // Kirim semua data dan fungsi ke seluruh anak komponen
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext