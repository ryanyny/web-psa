import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import { posts } from "../../http/index.js"

const CreatePost = () => {
  const nav = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  // Fungsi submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Buat objek FormData untuk kirim text dan file
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      if (image) formData.append("image", image)

      // Kirim request POST ke backend
      const res = await posts.create(formData)
      nav(`/blog/post/${res.data.post.id}`)
    } catch {
      alert("Gagal buat post")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Memuat...</div>

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow">
      {/* Input judul */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
        className="w-full p-2 border rounded"
        required />
      {/* Input upload file */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 border rounded" />
      {/* Preview gambar jika ada file yang dipilih */}
      {image instanceof File && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="w-32 h-32 object-cover" />
      )}
      {/* Editor rich text untuk isi blog */}
      <ReactQuill value={content} onChange={setContent} />

      {/* Tombol submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded">
          {loading ? "Mengunggah..." : "Unggah"}
        </button>
      </div>
    </form>
  )
}

export default CreatePost