// import React, { useState } from 'react';

const Step3Education = ({ prevStep, nextStep, handleChange, handleCheckboxChange,values }) => {

  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (
      !values.educationLevel ||
      !values.latestEducationalInstitution ||
      !values.major ||
      values.certificate.length === 0
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
        <label htmlFor="educationLevel" className="block text-sm font-medium mb-2">Pendidikan Terakhir *</label>
        <select id="educationLevel" value={values.educationLevel} onChange={handleChange('educationLevel')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Pilih Pendidikan Terakhir</option>
          <option value="SMK/SMA/MA/Setara">SMK/SMA/MA/Setara</option>
          <option value="Diploma">Diploma</option>
          <option value="Sarjana">Sarjana</option>
          <option value="Magister">Magister</option>
        </select>
      </div>
      <div>
          <label htmlFor="latestEducationalInstitution" className="block text-sm font-medium mb-2">Asal Institusi/ Lembaga Pendidikan Terakhir *</label>
          <input type="text" id="latestEducationalInstitution" value={values.latestEducationalInstitution} onChange={handleChange('latestEducationalInstitution')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama institusi" />
      </div>
      <div>
        <label htmlFor="major" className="block text-sm font-medium mb-2">Jurusan *</label>
        <input type="text" id="major" value={values.major} onChange={handleChange('major')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan jurusan" />
      </div>
      <div>
        <label htmlFor="certificate" className="block text-sm font-medium mb-2">Sertifikasi Kompetensi Yang Dimiliki *</label>
        <div className="space-y-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    value="Punya Skill Akademi (Sertifikasi Internal)"
                    checked={values.certificate.includes('Punya Skill Akademi (Sertifikasi Internal)')}
                    onChange={handleCheckboxChange('certificate')}
                    className="mr-2"
                />
                Punya Skill Akademi (Sertifikasi Internal)
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    value="BNSP (Sertifikasi Nasional)"
                    checked={values.certificate.includes('BNSP (Sertifikasi Nasional)')}
                    onChange={handleCheckboxChange('certificate')}
                    className="mr-2"
                />
                BNSP (Sertifikasi Nasional)
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    value="Coursera (Sertifikasi Internasional)"
                    checked={values.certificate.includes('Coursera (Sertifikasi Internasional)')}
                    onChange={handleCheckboxChange('certificate')}
                    className="mr-2"
                />
                Coursera (Sertifikasi Internasional)
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    value="Microsoft Office Specialist (Sertifikasi Internasional)"
                    checked={values.certificate.includes('Microsoft Office Specialist (Sertifikasi Internasional)')}
                    onChange={handleCheckboxChange('certificate')}
                    className="mr-2"
                />
                Microsoft Office Specialist (Sertifikasi Internasional)
            </label>
                <label className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    value="Tidak Punya Sertifikasi"
                    checked={values.certificate.includes('Tidak Punya Sertifikasi')}
                    onChange={handleCheckboxChange('certificate')}
                    className="mr-2"
                />
                Tidak Punya Sertifikasi
            </label>
        </div>
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

export default Step3Education;