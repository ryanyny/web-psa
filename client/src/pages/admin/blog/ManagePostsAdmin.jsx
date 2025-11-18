// client/src/pages/admin/ManagePostsAdmin.jsx
import { useEffect, useState } from "react"
import { admin } from "../../../http/index.js"
import { formatIndonesianDate } from "../../../utils/formatters.js"

export default function ManagePostsAdmin() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)

      const res = await admin.getPosts()
      setPosts(res.data || [])
    } catch (e) {
      setErr(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const deletePost = async (id) => {
    if (!confirm("Hapus post ini?")) return

    try {
      await admin.deletePost(id)

      fetchPosts()
    } catch (e) {
      alert("Delete failed: " + (e?.response?.data?.message || e.message))
    }
  }

  return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Kelola Postingan</h1>

        {loading && <div>Loading...</div>}
        {err && <div className="text-red-500">{err}</div>}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Penulis</th>
                <th className="p-3">Dibuat</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.author?.name ?? "-"}</td>
                  <td className="p-3">{formatIndonesianDate(p.createdAt)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deletePost(p.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {posts.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Tidak ada postingan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
}