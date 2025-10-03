import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { posts } from "../http/index.js"
import AuthContext from "../context/AuthContext.jsx"

const PostDetail = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { user } = useContext(AuthContext)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Ambil detail post
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await posts.getById(id) // Ambil API post berdasarkan id
        setPost(res.data) // Simpan data post ke state
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  // Handle hapus post
  const handleDelete = async () => {
    if (!confirm("Yakin mau hapus post ini?")) return

    try {
      await posts.remove(id) // Panggil API delete post
      nav("/");
    } catch {
      alert("Gagal hapus")
    }
  }

  if (loading) return <div>Loading...</div>
  if (!post) return <div>Post not found</div>

  // Cek apakah user yang login adalah author post
  const isAuthor = user && user._id === String(post.author?._id || post.author)

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Judul Post */}
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {/* Info author dan tanggal post dibuat */}
      <p className="text-sm text-gray-500">
        oleh {post.author?.username} — {new Date(post.createdAt).toLocaleString()}
      </p>
      {/* Tampilkan cover image jika ada */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full max-h-[500px] object-cover rounded my-4" />
      )}
      {/* Konten post (rich text) */}
      <div
        className="mt-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} />
      {/* Tampilkan tombol Ubah dan Hapus jika user adalah author */}
      {isAuthor && (
        <div className="mt-4 flex gap-2">
          <Link to={`/edit/${post._id}`} className="px-3 py-1 border rounded">
            Ubah
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded">
            Hapus
          </button>
        </div>
      )}
    </div>
  )
}

export default PostDetail