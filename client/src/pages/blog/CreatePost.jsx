import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import { posts } from "../../http/index.js";

const CreatePost = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
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
        {image instanceof File && (
          <img
            src={URL.createObjectURL(image)}
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
        {loading ? "Mengunggah..." : "Unggah"}
      </button>
    </form>
    </div>
  );
};

export default CreatePost;