import { useEffect, useState } from "react"
import { posts } from "../../http/index.js"
import PostCard from "../../components/blog/PostCard.jsx"

const Home = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await posts.getAll() // Panggil API posts
        setList(res.data) // Simpan data post ke state
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div>Memuat...</div>
  if (!list.length)
    return <div>Belum ada postingan! — jadi yang pertama nulis dong!</div>

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {list.map((p) => (
        <PostCard key={p.id} post={p} /> // Tampilkan tiap postingan menggunakan PostCard
      ))}
    </div>
  )
}

export default Home