import { useEffect, useState } from "react";
import { bookmarks } from "../../http/index.js";
import PostCard from "../../components/blog/PostCard.jsx";
import Pagination from "../../components/blog/Pagination.jsx";

const SavedPosts = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await bookmarks.getUserBookmarks();
        setList(res.data || []);
      } catch (err) {
        console.error("Gagal mengambil postingan disimpan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(list.length / postsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
        Memuat postingan yang disimpan...
      </div>
    );

  return (
    <section className="py-12 md:py-5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-brand-navy mb-2 tracking-tight">
            Postingan Disimpan
          </h1>
          <p className="mt-10 text-sm text-gray-600">
            Menampilkan {indexOfFirstPost + 1}-
            {Math.min(indexOfLastPost, list.length)} dari {list.length} postingan yang disimpan
          </p>
        </div>

        {/* Konten */}
        {list.length > 0 ? (
          <>
            {/* Grid posts */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-20 bg-brand-light-gray rounded-lg border border-gray-200">
            <p className="text-xl text-gray-600 font-medium mb-4">
              Belum menyimpan postingan apapun 📚
            </p>
            <a
              href="/blog"
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Jelajahi Blog
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPosts;