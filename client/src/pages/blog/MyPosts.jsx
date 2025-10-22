import { useEffect, useState, useContext } from "react"
import { posts } from "../../http/index.js"
import AuthContext from "../../context/AuthContext.jsx"
import PostCard from "../../components/blog/PostCard.jsx"
import Pagination from "../../components/blog/Pagination.jsx"

const MyPosts = () => {
  const { user } = useContext(AuthContext)
  const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const postsPerPage = 9 // Jumlah post yang ditampilkan per halaman

  // --- useEffect: Pengambilan dan pemfilteran data ---
  useEffect(() => {
    // Pastikan ID user sudah tersedia sebelum fetching
    if (!user?.id) return

    const fetch = async () => {
      try {
        // Ambil semua postingan
        const res = await posts.getAll()

        // Ambil hanya postingan yang penulisnya (author) adalah user saat ini
        const mine = res.data.filter(
          (p) => String(p.author?.id || p.author) === String(user.id)
        )

        setList(mine) // Perbarui daftar postingan milik user
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [user?.id]) // Dependency user.id: jalankan ulang ketika user terautentikasi berubah

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Gulir ke atas halaman agar user melihat post baru
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // --- Logika paginasi ---
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(list.length / postsPerPage)

  // Tampilan loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
        Loading...
      </div>
    )

  // --- Render utama ---
  return (
    <section className="py-12 md:py-5">
      {" "}
      <div className="container mx-auto px-4">
        <div className="mb-10">
          {/* Header halaman */}
          <h1 className="text-4xl font-extrabold text-brand-navy mb-2 tracking-tight">
            Postinganku
          </h1>

          {/* Teks status paginasi */}
          <p className="mt-10 text-sm text-gray-600">
            Menampilkan {indexOfFirstPost + 1}-
            {Math.min(indexOfLastPost, list.length)} dari {list.length}{" "}
            postinganmu
          </p>
        </div>

        {/* Tampilan daftar postingan */}
        {list.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>

            {/* Komponen paginasi */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          /* Tampilan saat postingan kosong */
          <div className="flex flex-col justify-center items-center py-20 bg-brand-light-gray rounded-lg border border-gray-200">
            <p className="text-xl text-gray-600 font-medium mb-4">
              Kamu belum menulis postingan apa-apa nih 📝
            </p>
            {/* Tombol aksi untuk membuat post baru */}
            <a
              href="/blog/create"
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Mulai Tulis Sekarang
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default MyPosts