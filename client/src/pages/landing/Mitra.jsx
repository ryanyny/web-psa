import ImgPro from "../../assets/images/img-kemnaker.png";
import ImgMitra2 from "../../assets/images/img-cimb-mitra.png";
import ImgMitra3 from "../../assets/images/img-edelweis.jpeg";
import ImgMitra4 from "../../assets/images/img-ubraw.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Mitra() {
  const [mitras, setMitras] = useState([]);

  //get all data from backend
  useEffect(() => {
    const fetchMitras = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mitra");
        setMitras(res.data);
      } catch (err) {
        console.error("Gagal mengambil data mitra:", err);
      }
    };

    fetchMitras();
  }, []);
  return (
    <>
      {/*Program Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-bold leading-tight">
              Mitra mitra yang bekerja sama dengan{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-blue-700 animate-pulse">
                Punya Skill Akademi
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mari bergabung menjadi mitra kami...
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mitras.map((mitra) => (
              <div
                key={mitra.id}
                className="max-w-sm bg-white rounded-lg shadow-sm hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <img
                  className="rounded-t-lg w-full h-50 bject-cover"
                  src={`http://localhost:5000/uploads/${mitra.image}`}
                  alt="mitra.nama_mitra"
                />

                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                    {mitra.nama_mitra}
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
                    {mitra.deskripsi.length > 100
                      ? `${mitra.deskripsi.slice(0, 100)}...`
                      : mitra.deskripsi}
                  </p>
                  <a
                    href={`/detail-mitra/${mitra.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
