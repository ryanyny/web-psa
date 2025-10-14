import React, { useState } from "react";
import { toast } from "react-toastify";
import { comments } from "../../http/index.js"

const CommentForm = ({ postId, onCommentAdded, isAuthenticated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await comments.create(postId, content);

      setContent("");

      onCommentAdded();
      toast.success("Komentar berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambahkan komentar:", error);
      toast.error(error.response?.data?.message || "Gagal mengirim komentar.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
        Silakan{" "}
        <a
          href="/login"
          className="font-semibold text-brand-blue hover:underline"
        >
          masuk
        </a>{" "}
        untuk meninggalkan komentar.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h3 className="text-xl font-bold text-brand-navy mb-4">
        Tinggalkan Komentar
      </h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue resize-none"
        rows="4"
        placeholder="Tuliskan komentar Anda di sini..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        disabled={loading}
      />
      <button
        type="submit"
        className="mt-3 px-6 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-navy transition duration-300 disabled:bg-gray-400"
        disabled={loading || !content.trim()}
      >
        {loading ? "Mengirim..." : "Kirim Komentar"}
      </button>
    </form>
  );
};

export default CommentForm;