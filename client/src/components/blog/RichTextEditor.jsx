import { useEffect, useRef } from "react"
import ReactQuill, { Quill } from "react-quill-new"
import BlotFormatter from "quill-blot-formatter"
import "react-quill-new/dist/quill.snow.css"
import { toast } from "react-toastify"
import { upload } from "../../http/index.js"

// Daftarkan modul BlotFormatter ke Quill agar gambar dapat diresize / drag
Quill.register("modules/blotFormatter", BlotFormatter)

// --- Konfigurasi modul Quill
const modules = {
  blotFormatter: {},
  toolbar: {
    // Daftar tombol toolbar
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    // Handler custom untuk tombol di toolbar
    handlers: {
      image: () => {},
      // Handler custom untuk List (memastikan tag yang benar digunakan)
      list: function (value) {
        const quill = this.quill

        if (value === "ordered" || value === "bullet") {
          quill.format("list", value, Quill.sources.USER)
        } else {
          quill.format("list", false, Quill.sources.USER)
        }
      },
    },
  },
  clipboard: {
    matchVisual: false, // Memastikan paste dari luar tidak membawa styling aneh
  },
}

// --- Daftar format yang diizinkan
const formats = [
  "header", "bold", "italic", "underline", "strike", "list",
  "ordered", "bullet", "align", "blockquote", "code-block",
  "link", "image",
]

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null)

  // useEffect: Menambahkan handler upload gambar custom
  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    const toolbar = editor.getModule("toolbar")

    // Ganti handler default tombol "image" dengan fungsi custom
    toolbar.addHandler("image", () => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append("image", file)

        try {
          const res = await upload.image(formData);
          const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${ res.data.url }`

          // Sisipkan gambar ke dalam editor pada posisi kursor saat ini
          const range = editor.getSelection()
          editor.insertEmbed(range.index, "image", imageUrl)
          toast.success("📸 Gambar berhasil diunggah!")
        } catch (error) {
          console.error("Upload gagal:", error)
          toast.error("❌ Gagal upload gambar!")
        }
      }
    })
  }, [])

  return (
    <div className="w-full">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Tulis sesuatu yang keren..."
        className="quill-editor"
      />
    </div>
  )
}

export default RichTextEditor