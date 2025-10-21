import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categories, posts } from "../../http/index.js";
import RichTextEditor from "../../components/blog/RichTextEditor.jsx";

const CreatePost = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false);

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
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      selectedCategories.forEach(id => { // <-- Kirim setiap ID kategori
        formData.append("categories[]", id); // Atau `categories` saja, tergantung cara server Anda. Gunakan `categories[]` jika server mengharapkan array
      });
      if (image) formData.append("image", image);

      const res = await posts.create(formData);
      toast.success("Blog berhasil diunggah!")
      nav(`/blog/post/${res.data.post.id}`);
    } catch {
      toast.error("Blog gagal diunggah!")
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
        Memuat...
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px-200px)] bg-gray-50 flex flex-col justify-start py-12">
          <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col gap-6 w-full"
    >
      <h1 className="text-3xl font-bold text-brand-navy mb-4">Tulis Postingan Baru</h1>
      {/* Input Judul */}
      <input
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Masukkan judul postingan..."
        className="w-full text-xl md:text-2xl font-semibold p-4 border-b-2 border-gray-300 focus:outline-none focus:border-brand-blue transition duration-200"
        required
      />

      <label className="text-gray-600 font-medium pt-2">Kategori (Pilih minimal satu)</label>
      {/* Dropdwon Kategori */}
      <select
        value={selectedCategories}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value)
          setSelectedCategories(values)
        }}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue min-h-[150px] transition"
        multiple >
          {categoryList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
            </option>
          ))}
        </select>

      {/* Upload Gambar */}
      <label className="text-gray-600 font-medium">Gambar (Opsional)</label>
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer"
        />
        {/* Preview Gambar */}
        {image instanceof File && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-md shadow-md border border-gray-100"
          />
        )}
      </div>

      {/* Editor Rich Text */}
      <label className="text-gray-600 font-medium">Konten Postingan</label>
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={loading || selectedCategories.length === 0 || !title.trim() || !content.trim()}
        className="w-full px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
      >
        {loading ? "Mengunggah..." : "Unggah Postingan"}
      </button>
    </form>
    </div>
  );
};

export default CreatePost;