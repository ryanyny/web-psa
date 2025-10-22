import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { categories, posts } from "../../http/index.js"
import RichTextEditor from "../../components/blog/RichTextEditor.jsx"

const CreatePost = () => {
  const nav = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)

  // --- useEffect: Ambil daftar kategori ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categories.getAll()
        setCategoryList(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategories()
  }, []) // Dependency kososng: Hanya dijalankan saat mount

  // --- Validasi Form ---
  const validatePostForm = useCallback(() => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    // Validasi judul
    if (trimmedTitle.length < 5)
      return "Judul minimal 5 karakter."
    if (trimmedTitle.length > 100)
      return "Judul maksimal 100 karakter."
    if (!/^[a-zA-Z0-9\s.,!?'"-]+$/.test(trimmedTitle))
      return "Judul mengandung karakter tidak valid."

    // Validasi konten
    if (trimmedContent.length < 30)
      return "Konten terlalu pendek. Minimal 30 karakter."

    // Validasi kategori
    if (selectedCategories.length === 0)
      return "Pilih minimal satu kategori."

    // Validasi gambar (jika ada)
    if (image) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"]

      if (!validTypes.includes(image.type))
        return "Format gambar tidak valid. Gunakan JPG, PNG, atau WEBP."
      if (image.size > 3 * 1024 * 1024)
        return "Ukuran gambar maksimal 3MB."
    }

    return null // Null menandakan validasi sukses
  }, [title, content, selectedCategories, image] )

  // --- Handler pengiriman form ---
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const validationError = validatePostForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    setLoading(true)

    try {
      const formData = new FormData() // Digunakan untuk mengirim data post termasuk file gambar

      formData.append("title", title)
      formData.append("content", content)

      selectedCategories.forEach((id) => {
        formData.append("categories[]", id)
      })

      if (image) formData.append("image", image)

      const res = await posts.create(formData) // Kirim data

      toast.success("Blog berhasil diunggah!")
      nav(`/blog/post/${res.data.post.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      toast.error("Blog gagal diunggah!")
    } finally {
      setLoading(false);
    }
  }, [title, content, selectedCategories, image, nav, validatePostForm])

  // Tampilan loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
        Loading...
      </div>
    );

  // --- Render utama ---
  return (
    <div className="min-h-[calc(100vh-80px-200px)] bg-gray-50 flex flex-col justify-start py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col gap-6 w-full"
      >
        {/* Header halaman */}
        <h1 className="text-3xl font-bold text-brand-navy mb-4">
          Tulis Postingan Baru
        </h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul postingan..."
          className="w-full text-xl md:text-2xl font-semibold p-4 border-b-2 border-gray-300 focus:outline-none focus:border-brand-blue transition duration-200"
          required
        />

        {/* Kategori */}
        <label className="text-gray-600 font-medium pt-2">
          Kategori (Pilih minimal satu)
        </label>
        <select
          value={selectedCategories}
          onChange={(e) => {
            const values = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            )
            setSelectedCategories(values)
          }}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue min-h-[150px] transition"
          multiple
        >
          {categoryList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
            </option>
          ))}
        </select>

        {/* Gambar */}
        <label className="text-gray-600 font-medium">Gambar (Opsional)</label>
        <div className="flex flex-col md:flex-row md:items-center gap-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setImage(file)
            }}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer"
          />

          {/* Preview gambar */}
          {image instanceof File && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md shadow-md border border-gray-100"
            />
          )}
        </div>

        {/* Isi konten */}
        <label className="text-gray-600 font-medium">Konten Postingan</label>
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Tombol aksi untuk mengunggah post baru */}
        <button
          type="submit"
          disabled={
            loading ||
            selectedCategories.length === 0 ||
            !title.trim() ||
            !content.trim()
          }
          className="w-full px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
        >
          {loading ? "Mengunggah..." : "Unggah Postingan"}
        </button>
      </form>
    </div>
  )
}

export default CreatePost