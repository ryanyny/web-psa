// client/src/pages/admin/DashboardAdmin.jsx
import { useEffect, useState, useContext } from "react"
import { admin } from "../../../http/index.js"
import AuthContext from "../../../context/AuthContext.jsx"

function StatCard({ label, value }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="mt-2 text-2xl font-semibold">{value ?? "-"}</div>
        </div>
    )
}

export default function DashboardAdmin() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useContext(AuthContext) || {}

    const storedUser = !user && typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null
    const currentUser = user || storedUser

    useEffect(() => {
        let mounted = true

        const fetchStats = async () => {
            try {
                setLoading(true)

                const res = await admin.stats()

                if (!mounted) return

                setStats(res.data?.stats ?? res.data)
            } catch (err) {
                setError(err?.response?.data?.message || err.message)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchStats()

        return () => (mounted = false)
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard Admin - Blog</h1>

                <div className="text-sm text-gray-600">
                    masuk sebagai: {currentUser?.name ?? currentUser?.email}
                </div>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">Error: {error}</div>}

            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Jumlah Pengguna" value={stats.totalUsers ?? stats.users ?? "-"} />
                    <StatCard label="Jumlah Postingan" value={stats.totalPosts ?? stats.posts ?? "-"} />
                    <StatCard label="Admin" value={stats.admins ?? "-"} />
                    <StatCard label="Pengguna Biasa" value={stats.normalUsers ?? "-"} />
                </div>
            )}
        </div>
    )
}