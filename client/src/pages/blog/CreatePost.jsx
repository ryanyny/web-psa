import { useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { posts } from "../../http/index.js"
import usePostForm from "../../hooks/usePostForm.js"
import RichTextEditor from "../../components/blog/RichTextEditor.jsx"

const CreatePost = () => {
  const nav = useNavigate()
  const imageInputRef = useRef(null)

  const handleCreatePost = useCallback(
    async (FormData) => {
      const res = await posts.create(FormData)

      toast.success("Blog berhasil diunggah!")
      nav(`/blog/post/${res.data.post.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, [nav])

  const {
    title, setTitle,
    content, setContent,
    image, handleImageChange,
    selectedCategories, handleCategoryChange,
    categoryList,
    isLoading,
    isSubmitting, handleSubmit,
    handleRemoveImage,
  } = usePostForm(null, handleCreatePost)

  const handleRemoveImageAndInput = useCallback(() => {
    handleRemoveImage()

    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }, [handleRemoveImage])

  // Tampilan loading
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
        Loading...
      </div>
    )

  const isFormDisabled = isSubmitting || selectedCategories.length === 0 || !title.trim() || !content.trim()

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
          onChange={handleCategoryChange}
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
            ref={imageInputRef}
            type="file"
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer"
          />

          {/* Preview gambar */}
          {image && (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-md shadow-md border border-gray-100"
              />
              <button
                type="button"
                onClick={handleRemoveImageAndInput}
                className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm font-bold shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
              >
                &times;
              </button>
            </div>
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
          disabled={isFormDisabled}
          className="w-full px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? "Mengunggah..." : "Unggah Postingan"}
        </button>
      </form>
    </div>
  )
}

export default CreatePost