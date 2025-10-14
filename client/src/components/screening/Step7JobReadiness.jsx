// import React, { useState } from 'react';

const Step7JobReadiness = ({ prevStep, nextStep, handleValueChange, handleChange, values }) => {

  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (!values.workReadiness || !values.willingToRelocate || !values.identity) {
      alert('Harap diisi semua');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Kapan bisa mulai kerja? *</label>
        <div className="space-y-4 mt-2">
            <div className="flex items-center">
                <input
                    type="radio"
                    name="workReadiness"
                    value="Segera"
                    checked={values.workReadiness === 'Segera'}
                    onChange={() => handleValueChange('workReadiness')('Segera')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Segera</label>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    name="workReadiness"
                    value="Dalam 1 Bulan"
                    checked={values.workReadiness === 'Dalam 1 Bulan'}
                    onChange={() => handleValueChange('workReadiness')('Dalam 1 Bulan')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Dalam 1 Bulan</label>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    name="workReadiness"
                    value="Dalam 3 Bulan"
                    checked={values.workReadiness === 'Dalam 3 Bulan'}
                    onChange={() => handleValueChange('workReadiness')('Dalam 3 Bulan')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Dalam 3 Bulan</label>
            </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Apakah bersedia ditempatkan di luar kota? *</label>
        <div className="space-y-4 mt-2">
            <div className="flex items-center">
                <input
                    type="radio"
                    name="willingToRelocate"
                    value="Ya"
                    checked={values.willingToRelocate === 'Ya'}
                    onChange={() => handleValueChange('willingToRelocate')('Ya')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Ya</label>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    name="willingToRelocate"
                    value="Tidak"
                    checked={values.willingToRelocate === 'Tidak'}
                    onChange={() => handleValueChange('willingToRelocate')('Tidak')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Tidak</label>
            </div>
        </div>
      </div>
      <div>
          <label htmlFor="identity" className="block text-sm font-medium mb-2">Identitas Kamu Dalam Satu File Format .pdf *</label>
          <input type="file" id="identity" onChange={handleChange('identity')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

export default Step7JobReadiness;