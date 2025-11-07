import { useEffect, useState } from "react"
import { bookmarks } from "../../http/index.js"
import usePagination from "../../hooks/usePagination.js"
import PostCard from "../../components/blog/PostCard.jsx"
import Pagination from "../../components/blog/Pagination.jsx"

const SavedPosts = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const postsPerPage = 9 // Menentukan jumlah post yang ditampilkan per halaman

  // --- useEffect: Pengambilan data postingan tersimpan ---
  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true)

      try {
        // Ambil data daftar post yang disimpan oleh user ini
        const res = await bookmarks.getUserBookmarks()
        setList(res.data || [])
      } catch (error) {
        console.error("Failed to fetch saved post:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSaved()
  }, []) // Dependency kososng: Hanya dijalankan saat mount

  const {
    currentPage,
    currentPosts,
    totalPages,
    indexOfFirstPost,
    indexOfLastPost,
    handlePageChange,
    list: paginatedList,
  } = usePagination(list, postsPerPage)

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
      <div className="container mx-auto px-4">
        <div className="mb-10">
          {/* Header halaman */}
          <h1 className="text-4xl font-extrabold text-brand-navy mb-2 tracking-tight">
            Postingan Disimpan
          </h1>

          {/* Teks status paginasi */}
          <p className="mt-10 text-sm text-gray-600">
            Menampilkan {indexOfFirstPost + 1}-
            {Math.min(indexOfLastPost, paginatedList.length)} dari {paginatedList.length}{" "}
            postingan yang disimpan
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
          /* Tampilan saat daftar postingan tersimpan kosong */
          <div className="flex flex-col justify-center items-center py-20 bg-brand-light-gray rounded-lg border border-gray-200">
            <p className="text-xl text-gray-600 font-medium mb-4">
              Belum menyimpan postingan apapun 📚
            </p>
            {/* Tombol aksi untuk jelajah blog */}
            <a
              href="/blog"
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Jelajahi Blog
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default SavedPosts