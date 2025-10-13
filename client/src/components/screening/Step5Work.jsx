// import React, { useState } from 'react';

const Step5Work = ({ prevStep, nextStep, handleChange, handleCheckboxChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (!values.currentStatus || 
        !values.experiences || 
        !values.photo || 
        !values.cv || 
        !values.portfolio
    ) {
      alert('Harap isi semua field yang wajib diisi.');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      {/* Input Fields */}
      <div>
        <label htmlFor="currentStatus" className="block text-sm font-medium mb-2">Status saat ini *</label>
        <div className="space-y-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="currentStatus"
                    value="Pernah Magang"
                    checked={values.currentStatus.includes('Pernah Magang')}
                    onChange={handleCheckboxChange('currentStatus')}
                    className="mr-2"
                />
                Pernah Magang
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="currentStatus"
                    value="Pernah Freelance"
                    checked={values.currentStatus.includes('Pernah Freelance')}
                    onChange={handleCheckboxChange('currentStatus')}
                    className="mr-2"
                />
                Pernah Freelance
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="currentStatus"
                    value="Pernah Kerja Tetap"
                    checked={values.currentStatus.includes('Pernah Kerja Tetap')}
                    onChange={handleCheckboxChange('currentStatus')}
                    className="mr-2"
                />
                Pernah Kerja Tetap
            </label>
        </div>
      </div>
      <div>
          <label htmlFor="experiences" className="block text-sm font-medium mb-2">Ceritakan pengalaman kerja / proyek terakhir kamu dan hasil akhirnya / impact-nya bagaimana (boleh cerita lebih dari satu)*</label>
          <textarea id="experiences" value={values.experiences} onChange={handleChange('experiences')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ceritakan pengalaman kerja / proyek terakhir kamu..."></textarea>
      </div>
      <div>
          <label htmlFor="photo" className="block text-sm font-medium mb-2">Pas Photo *</label>
          <input type="file" id="photo" onChange={handleChange('photo')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
          <label htmlFor="cv" className="block text-sm font-medium mb-2">Curriculum Vitae ATS Kamu *</label>
          <input type="file" id="cv" onChange={handleChange('cv')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
          <label htmlFor="portfolio" className="block text-sm font-medium mb-2">Portofolio Kreatif Kamu *</label>
          <input type="file" id="portfolio" onChange={handleChange('portfolio')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      
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