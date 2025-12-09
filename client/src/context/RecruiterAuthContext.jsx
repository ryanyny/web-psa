import { createContext, useState, useEffect, useCallback } from "react"
// import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { auth } from "../http/index.js"

// const navigate = useNavigate()

const RecruiterAuthContext = createContext({ user: null, loading: true })

export const RecruiterAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchMe = useCallback(async () => {
        try {
            const res = await auth.me()
            // Hanya recruiter yang sudah approved
            if (res.data.role === "recruiter" && res.data.isApproved) {
                setUser(res.data)
            } else {
                setUser(null)
            }
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

const login = async (data) => {
    try {
        const res = await auth.login(data)
        const userData = res.data.user
        
        // console.log("Full userData:", userData)
        
        // Cek apakah isApproved ada atau tidak
        if (userData.role === "recruiter") {
            if (userData.isApproved === undefined) {
                toast.error("Data approval tidak ditemukan. Hubungi admin!")
                throw new Error("Field isApproved tidak ada dalam response")
            }
            
            if (userData.isApproved) {
                setUser(userData)
                toast.success("Login recruiter berhasil!")
                // navigate('/punya-skill-connect/applicants', { replace: true })
                return userData
            } else {
                toast.error("Akun belum di-approve!")
                // throw new Error("Akun belum di-approve!")
            }
        } else {
            toast.error("Bukan akun recruiter!")
            // throw new Error("Bukan akun recruiter!")
        }
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Login gagal!"
        toast.error(message)
        throw new Error(message)
    }
}

    const logout = async () => {
        try {
            await auth.logout()
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            toast.success("Logout berhasil!")
        } catch (error) {
            toast.error("Logout gagal!")
            throw error
        }
    }

    return (
        <RecruiterAuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </RecruiterAuthContext.Provider>
    )
}

export default RecruiterAuthContext
