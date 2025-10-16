import React from 'react';
import FileInputDisplay from './FileInputDisplay';

// KOMPONEN UTAMA
const Step5Work = ({ prevStep, nextStep, handleChange, handleCheckboxChange, handleFileChange, handleFileRemove, values }) => {
  
  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sekarang akan selalu bekerja karena memeriksa 'values' dari state
    if (values.currentStatus.length === 0 || 
        !values.experiences || 
        !values.photo || 
        !values.cv || 
        !values.portfolio // Jangan lupa validasi untuk identity
    ) {
      // Menggunakan alert seperti kode asli Anda, namun disarankan menggunakan
      // komponen notifikasi yang lebih modern di production.
      alert('Harap isi semua field yang wajib diisi (bertanda *).');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-center">Pengalaman & Dokumen</h2>
      
      {/* Input Fields Checkbox */}
      <div>
        <label className="block text-sm font-medium mb-2">Status saat ini *</label>
        <div className="space-y-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    value="Pernah Magang"
                    checked={values.currentStatus.includes('Pernah Magang')}
                    onChange={handleCheckboxChange('currentStatus')}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                Pernah Magang
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    value="Pernah Freelance"
                    checked={values.currentStatus.includes('Pernah Freelance')}
                    onChange={handleCheckboxChange('currentStatus')}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                Pernah Freelance
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    value="Pernah Kerja Tetap"
                    checked={values.currentStatus.includes('Pernah Kerja Tetap')}
                    onChange={handleCheckboxChange('currentStatus')}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                Pernah Kerja Tetap
            </label>
        </div>
      </div>
      
      {/* Input Text Area */}
      <div>
        <label htmlFor="experiences" className="block text-sm font-medium mb-2">Ceritakan pengalaman kerja / proyek terakhir kamu dan hasil akhirnya / impact-nya bagaimana (boleh cerita lebih dari satu) *</label>
        <textarea 
          id="experiences" 
          value={values.experiences} 
          onChange={handleChange('experiences')} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Ceritakan pengalaman kerja / proyek terakhir kamu..."
          rows="5"
        ></textarea>
      </div>

      {/* Input Files menggunakan komponen bantuan */}
      <FileInputDisplay
        name="photo"
        label="Pas Photo"
        value={values.photo}
        handleFileChange={handleFileChange}
        handleFileRemove={handleFileRemove}
        required={true}
      />

      <FileInputDisplay
        name="cv"
        label="Curriculum Vitae ATS Kamu"
        value={values.cv}
        handleFileChange={handleFileChange}
        handleFileRemove={handleFileRemove}
        required={true}
      />

      <FileInputDisplay
        name="portfolio"
        label="Portofolio Kreatif Kamu"
        value={values.portfolio}
        handleFileChange={handleFileChange}
        handleFileRemove={handleFileRemove}
        required={true}
      />
      
      {/* Tombol Navigasi */}
      <div className="flex justify-between pt-4">
        <button type="button" onClick={prevStep} className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
          &larr; Kembali
        </button>
        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
          Berikutnya &rarr;
        </button>
      </div>
    </form>
  );
};

export default Step5Work;