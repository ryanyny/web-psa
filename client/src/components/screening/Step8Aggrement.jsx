import React from 'react';

const Step8Aggrement = ({ prevStep, handleSubmit, loading }) => {
    const [agreed, setAgreed] = React.useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('Anda harus menyetujui syarat dan ketentuan.');
            return;
        }
        handleSubmit();
    };

    return (
        <form onSubmit={submitForm} className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Persetujuan dan Pernyataan</h2>
                <div className="bg-gray-100 p-4 rounded text-sm mb-2 overflow-auto">
                    <p className="text-sm font-semibold">Mohon baca pernyataan berikut dengan tenang. Jika sudah setuju, cukup centang (✓) kotaknya.</p>
                    <h6>Dengan mengisi form ini, saya menyatakan bahwa saya telah memahami dan menyetujui hal-hal berikut:</h6>
                    <ul className="pl-5 space-y-1">
                        <li>1. Data yang saya berikan adalah benar, akurat, dan dapat dipertanggungjawabkan.</li>
                        <li>2. Data saya akan digunakan untuk pengelolaan talent pool alumni dan proses rekomendasi ke perusahaan/organisasi mitra.</li>
                        <li>3. Punya Skill Academy berperan sebagai penghubung (connector) antara alumni dan mitra, bukan sebagai pihak perekrut.</li>
                        <li>4. Proses seleksi, keputusan rekrutmen, maupun bentuk kerja sama sepenuhnya menjadi kewenangan mitra perusahaan/organisasi.</li>
                        <li>5. Saya memahami bahwa Punya Skill Academy tidak menjamin penempatan kerja, magang, ataupun proyek freelance.</li>
                        <li>6. Segala komunikasi lebih lanjut terkait seleksi atau status rekrutmen akan dilakukan langsung oleh mitra, bukan oleh Punya Skill Academy.</li>
                        <li>7. Punya Skill Academy tidak bertanggung jawab atas hasil seleksi, keputusan rekrutmen, maupun hubungan kerja yang terbentuk.</li>
                        <li>8. Data pribadi saya akan dijaga kerahasiaannya dan hanya dibagikan kepada mitra yang relevan sesuai kompetensi serta preferensi karir saya.</li>
                        <li>9. Saya memberikan izin kepada Punya Skill Academy untuk menyimpan, mengolah, dan merekomendasikan data saya kepada mitra.</li>
                        <li>10. Saya memahami bahwa hasil rekomendasi bersifat non-eksklusif; artinya data saya bisa direkomendasikan ke lebih dari satu mitra sesuai kebutuhan.</li>
                        <li>11. Saya menyadari bahwa kualitas data, portofolio, dan kesiapan diri saya akan memengaruhi peluang diterima oleh mitra.</li>
                        <li>12. Saya menyadari bahwa tanggung jawab utama atas proses wawancara, negosiasi, maupun perjanjian kerja berada di antara saya dan mitra.</li>
                        <li>13. Saya akan menjaga etika profesional serta nama baik diri saya, Punya Skill Academy, dan mitra dalam setiap interaksi.</li>
                        <li>14. Saya menerima bahwa Punya Skill Academy berhak mengeluarkan saya dari talent pool apabila ditemukan data palsu, pelanggaran etika, atau penyalahgunaan program.</li>
                        <li>15. Dengan ini saya menyetujui seluruh ketentuan di atas sebagai dasar partisipasi dalam program Punya Skill Connect.</li>
                    </ul>
                </div>
                <div className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="agree" className="ml-2 text-sm text-gray-700">
                        Saya telah membaca, memahami, dan menyetujui persetujuan & pernyataan di atas.
                    </label>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <button type="button" onClick={prevStep} className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    &larr; Kembali
                </button>
                <button type="submit" disabled={loading && !agreed} className={`px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition ${!agreed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} disabled:cursor-not-allowed`}>
                    {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                </button>
            </div>
        </form>
    );
};

export default Step8Aggrement;



