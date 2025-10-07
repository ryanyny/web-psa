import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { posts } from "../../http/index.js";
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data post lama
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await posts.getById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image instanceof File) formData.append("image", image);

      await posts.update(id, formData);
      toast.success("Blog berhasil diubah!")
      nav(`/blog/post/${id}`);
    } catch {
      toast.error("Blog gagal diubah!")
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
    <div className="min-h-[calc(100vh-80px-200px)] flex flex-col justify-start py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* Input Judul */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        {/* Upload Gambar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full md:w-auto p-2 border border-gray-300 rounded-lg cursor-pointer"
          />
          {/* Preview Gambar */}
          {image && (
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-sm"
            />
          )}
        </div>

        {/* Editor Rich Text */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg">
          <ReactQuill value={content} onChange={setContent} />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;