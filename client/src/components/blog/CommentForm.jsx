import { useState } from "react"
import { toast } from "react-toastify"
import { comments } from "../../http/index.js"

const CommentForm = ({
    postId,
    onCommentAdded,
    isAuthenticated,
    parentId = null,
}) => {
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    // Handler pengiriman formulir
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) return // Cegah pengiriman komentar kosong

        // Jika ada parentId, payload akan menjadi balasan
        setLoading(true)
        try {
            const payload = { content }

            if (parentId) {
                payload.parentId = parentId
            }

            const res = await comments.create(postId, payload)
            const newComment = res.data.comment

            toast.success(res.data.message || "Berhasil mengirim komentar!")

            if (onCommentAdded) {
                onCommentAdded(newComment)
            }

            setContent("")
        } catch (error) {
            console.error("Gagal menambahkan komentar:", error)
            toast.error(error.response?.data?.message || "Gagal mengirim komentar!")
        } finally {
            setLoading(false)
        }
    }

    // --- Tampilan: Jika user belum login ---
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
        )
    }

    // --- Render utama ---
    return (
        <form
            onSubmit={handleSubmit}
            className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 ${
                parentId ? "p-4 shadow-md" : "p-6 shadow-lg"
            }`}
        >
            {/* Judul form (hanya tampil untuk komentar utama, bukan balasan) */}
            {!parentId && (
                <h3 className="text-xl font-bold text-brand-navy mb-4">
                    Tinggalkan Komentar
                </h3>
            )}

            {/* Textarea input komentar */}
            <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue resize-none transition"
                rows={parentId ? 3 : 4}
                placeholder={ parentId ? "Tulis balasan Anda..." : "Tuliskan komentar Anda di sini..." }
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={loading}
            />

            {/* Tombol kirim */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="mt-3 px-6 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-navy transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={loading || !content.trim()}
                >
                    {loading ? "Mengirim..." : parentId ? "Balas" : "Kirim Komentar"}
                </button>
            </div>
        </form>
    )
}

export default CommentForm