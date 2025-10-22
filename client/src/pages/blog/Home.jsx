import { useState, useEffect, useMemo, useCallback } from "react"
import { posts, categories } from "../../http/index.js"
import PostCard from "../../components/blog/PostCard.jsx"
import Pagination from "../../components/blog/Pagination.jsx"

const Home = () => {
  const [allPosts, setAllPosts] = useState([])
  const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const postsPerPage = 9 // Jumlah post yang ditampilkan per halaman

  // --- useEffect: Pengambilan data awal ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        // Ambil semua postingan
        const postsRes = await posts.getAll()
        setAllPosts(postsRes.data)

        // Ambil semua kategori
        const categoryRes = await categories.getAll()
        setCategoryList(categoryRes.data)
      } catch (err) {
        console.error("Failed to fetch data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Dependency kososng: Hanya dijalankan saat mount

  // --- useMemo: Logika filtering dan pencarian ---
  useMemo(() => {
    let currentList = allPosts

    // Filter berdasarkan kategori
    if (selectedCategory) {
      currentList = currentList.filter((post) =>
        post.categories.some((cat) => String(cat.id) === selectedCategory)
      )
    }

    // Filter berdasarkan pencarian
    if (search.trim()) {
      const lowerCaseSearch = search.toLowerCase()

      currentList = currentList.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseSearch) || post.excerpt.toLowerCase().includes(lowerCaseSearch)
      )
    }

    // Perbarui daftar hasil yang sudah difilter / dicari
    setList(currentList)
    // Reset halaman ke-1 setiap kali filter / pencarian berubah
    setCurrentPage(1)

    return currentList
  }, [allPosts, selectedCategory, search])

  // --- Handle interaksi pengguna ---

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value)
    setSearch("") // Hapus pencarian saat filter kategori diubah
  }, [])

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value)
    setSelectedCategory("") // Hapus filter kategori saat pencarian dimulai
  }, [])

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

  // Tampilan saat tidak ada postingan sama sekali
  if (!allPosts.length)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-gray-400 text-lg italic gap-3">
        <p>Belum ada postingan yang tersedia 😔</p>
      </div>
    )

  // --- Render utama ---
  return (
    <section className="py-12 md:py-5">
      <div className="container mx-auto px-4">
        {/* Header halaman */}
        <h1 className="text-4xl font-extrabold text-brand-navy mb-2 tracking-tight">
          Blog Terbaru
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Temukan artikel dan cerita menarik disini.
        </p>

        {/* Input pencarian dan filter kategori */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-1/2">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Cari judul atau ringkasan postingan..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-full bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition duration-200"
            />
          </div>

          {/* Dropdown filter kategori */}
          <div className="relative w-full md:w-auto md:min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="appearance-none pl-4 pr-12 py-3 border-2 border-gray-300 rounded-full bg-white text-gray-700 font-medium shadow-sm hover:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition duration-200 cursor-pointer w-full md:w-auto"
            >
              <option value="">Semua Blog</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </option>
              ))}
            </select>
            {/* Ikon panah dropdown */}
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Teks status paginasi */}
        <div className="mb-5 text-sm text-gray-600">
          {search.trim()
            ? `Menampilkan ${list.length} hasil untuk "${search}"`
            : `Menampilkan ${indexOfFirstPost + 1}-${Math.min(
                indexOfLastPost,
                list.length
              )} dari ${list.length} postingan`}
        </div>

        {/* Tampilan daftar postingan */}
        {currentPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          // Tampilan saat tidak ada postingan setelah filter / pencarian
          <div className="flex flex-col justify-center items-center py-20 bg-brand-light-gray rounded-lg border border-gray-200">
            <p className="text-xl text-gray-600 font-medium mb-4">
              Tidak ada postingan yang cocok dengan kriteria tersebut 😔
            </p>
          </div>
        )}

        {/* Komponen paginasi */}
        {totalPages > 1 && currentPosts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-12"
          />
        )}
      </div>
    </section>
  )
}

export default Home