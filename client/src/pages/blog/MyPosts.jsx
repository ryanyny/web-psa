import { useEffect, useState, useContext } from "react";
import { posts } from "../../http/index.js";
import AuthContext from "../../context/AuthContext.jsx";
import PostCard from "../../components/blog/PostCard.jsx";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data post
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await posts.getAll();

        // Filter post yang dibuat user yang login
        const mine = res.data.filter(
          (p) => String(p.author?.id || p.author) === String(user.id)
        );

        setList(mine);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
        Memuat postinganku...
      </div>
    );

  if (!list.length)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg italic">
        Kamu belum nulis apa-apa nih.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;