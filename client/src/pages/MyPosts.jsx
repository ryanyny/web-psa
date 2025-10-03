import { useEffect, useState, useContext } from "react"
import { posts } from "../http/index.js"
import AuthContext from "../context/AuthContext.jsx"
import PostCard from "../components/PostCard.jsx"

const MyPosts = () => {
  const { user } = useContext(AuthContext)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  // Ambil data post
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await posts.getAll() // Ambil semua post dari backend

        // Filter post yang hanya dibuat oleh user yang login
        const mine = res.data.filter(
          (p) => String(p.author?._id || p.author) === String(user._id)
        )

        setList(mine) // Simpan hasil filter ke state
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user])

  if (loading) return <div>Loading...</div>
  if (!list.length) return <div>Kamu belum nulis apa-apa nih.</div>

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.map((p) => (
        <PostCard key={p._id} post={p} /> // Tampilkan tiap post menggunakan PostCard
      ))}
    </div>
  )
}

export default MyPosts