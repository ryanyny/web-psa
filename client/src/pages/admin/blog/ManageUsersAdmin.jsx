// client/src/pages/admin/ManageUsersAdmin.jsx
import { useEffect, useState } from "react"
import { admin } from "../../../http/index.js"
import { formatIndonesianDate } from "../../../utils/formatters.js"

export default function ManageUsersAdmin() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(null)

    const fetchUsers = async () => {
        try {
            setLoading(true)

        const res = await admin.getUsers()
        setUsers(res.data || [])
        } catch (e) {
            setErr(e?.response?.data?.message || e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const toggleRole = async (u) => {
        const newRole = u.role === "admin" ? "user" : "admin"
        
        try {
            await admin.updateUserRole({
                role: newRole
            })

        fetchUsers()
        } catch (e) {
            alert("Failed to change role: " + (e?.response?.data?.message || e.message))
        }
    }

    const deleteUser = async (id) => {
        if (!confirm("Yakin mau hapus user ini?")) return

        try {
            await admin.deleteUser(id)

            fetchUsers()
        } catch (e) {
            alert("Delete failed: " + (e?.response?.data?.message || e.message))
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Kelola Pengguna</h1>

            {loading && <div>Loading...</div>}
            {err && <div className="text-red-500 mb-2">{err}</div>}

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Dibuat</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u.id} className="border-t">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3">{u.name ?? "-"}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">{u.role}</td>
                                <td className="p-3">{formatIndonesianDate(u.createdAt)}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => toggleRole(u)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                                    >
                                        Ubah Role
                                    </button>
                                    <button
                                        onClick={() => deleteUser(u.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    Tidak ada pengguna.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}