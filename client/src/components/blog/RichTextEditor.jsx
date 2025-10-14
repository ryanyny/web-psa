import { useEffect, useRef } from "react"
import ReactQuill, { Quill } from "react-quill-new"
import BlotFormatter from "quill-blot-formatter"
import "react-quill-new/dist/quill.snow.css"
import { toast } from "react-toastify"
import { upload } from "../../http/index.js"

// Daftarin plugin BlotFormatter
Quill.register("modules/blotFormatter", BlotFormatter)
// 💡 PERBAIKAN: Register List blot secara eksplisit
// Ini adalah solusi paling umum untuk bug konversi list Quill
const List = Quill.import('formats/list');
List.tagName = 'LI'; // Pastikan list item adalah LI
Quill.register(List, true);

// Pastikan Quill mengetahui format mana yang harus digunakan
const Delta = Quill.import('delta');
Quill.register(List, true); 

const modules = {
  blotFormatter: {},
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: () => {},
      list: function (value) {
        const quill = this.quill

        if (value === "ordered" || value === "bullet") {
          quill.format("list", value, Quill.sources.USER)
        } else {
          quill.format("list", false, Quill.sources.USER)
        }
      }
    },
  },
  clipboard: {
    matchVisual: false, // ⚡ ini penting biar list <ul>/<ol> ke-render bener
  },
}

const formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "list", "ordered", "bullet",
  "align",
  "blockquote", "code-block",
  "link", "image",
]

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null)

  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    const toolbar = editor.getModule("toolbar")

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
          const res = await upload.image(formData)
          const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${res.data.url}`

          const range = editor.getSelection()
          editor.insertEmbed(range.index, "image", imageUrl)
          toast.success("📸 Gambar berhasil diunggah!")
        } catch (err) {
          console.error("Upload gagal:", err)
          toast.error("❌ Gagal upload gambar!")
        }
      }
    })
  }, [])

  return (
    <div>
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