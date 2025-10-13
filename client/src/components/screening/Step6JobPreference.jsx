// import React, { useState } from 'react';

const Step6JobPreference = ({ prevStep, nextStep, handleCheckboxChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (!values.jobField || 
        !values.jobType || 
        !values.preferredWorkLocations
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
        <label htmlFor="jobType" className="block text-sm font-medium mb-2">Jenis Pekerjaan yang diinginkan (bisa pilih lebih dari 1)  *</label>
        <div className="space-y-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobType"
                    value="Full Time"
                    checked={values.jobType.includes('Full Time')}
                    onChange={handleCheckboxChange('jobType')}
                    className="mr-2"
                />
                Full Time
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobType"
                    value="Part Time"
                    checked={values.jobType.includes('Part Time')}
                    onChange={handleCheckboxChange('jobType')}
                    className="mr-2"
                />
                Part Time
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobType"
                    value="FreeLance"
                    checked={values.jobType.includes('FreeLance')}
                    onChange={handleCheckboxChange('jobType')}
                    className="mr-2"
                />
                FreeLance
            </label>
                <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobType"
                    value="Internship/Magang"
                    checked={values.jobType.includes('Internship/Magang')}
                    onChange={handleCheckboxChange('jobType')}
                    className="mr-2"
                />
                Internship/Magang
            </label>
                <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobType"
                    value="Project-based"
                    checked={values.jobType.includes('Project-based')}
                    onChange={handleCheckboxChange('jobType')}
                    className="mr-2"
                />
                Project-based
            </label>
        </div>
      </div>
      <div>
        <label htmlFor="jobField" className="block text-sm font-medium mb-2">Jenis Pekerjaan yang diinginkan (bisa pilih lebih dari 1) *</label>
        <div className="space-y-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Teknologi & Digital"
                    checked={values.jobField.includes('Teknologi & Digital')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Teknologi & Digital
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Keuangan & Akuntansi"
                    checked={values.jobField.includes('Keuangan & Akuntansi')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Keuangan & Akuntansi
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Manufaktur & Teknik"
                    checked={values.jobField.includes('Manufaktur & Teknik')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Manufaktur & Teknik
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Kesehatan & Wellness"
                    checked={values.jobField.includes('Kesehatan & Wellness')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Kesehatan & Wellness
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Pendidikan & Pelatihan"
                    checked={values.jobField.includes('Pendidikan & Pelatihan')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Pendidikan & Pelatihan
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Logistik & Supply Chain"
                    checked={values.jobField.includes('Logistik & Supply Chain')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Logistik & Supply Chain
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Pariwisata, Hospitality & Lifestyle"
                    checked={values.jobField.includes('Pariwisata, Hospitality & Lifestyle')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Pariwisata, Hospitality & Lifestyle
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Komunikasi & Media"
                    checked={values.jobField.includes('Komunikasi & Media')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                />
                Komunikasi & Media
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Pemerintahan & NGO"
                    checked={values.jobField.includes('Pemerintahan & NGO')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                    />
                Pemerintahan & NGO
            </label>
                        <label className="flex items-center">
                <input
                    type="checkbox"
                    name="jobField"
                    value="Pertanian, Kehutanan & Lingkungan"
                    checked={values.jobField.includes('Pertanian, Kehutanan & Lingkungan')}
                    onChange={handleCheckboxChange('jobField')}
                    className="mr-2"
                    />
                Pertanian, Kehutanan & Lingkungan
            </label>
        </div>
        </div>
        <div>
        <label htmlFor="preferredWorkLocations" className="block text-sm font-medium mb-2">Lokasi / Bentuk Kerja yang diinginkan (bisa pilih lebih dari satu) *</label>
        <div className="space-y-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="preferredWorkLocations"
                    value="Onsite"
                    checked={values.preferredWorkLocations.includes('Onsite')}
                    onChange={handleCheckboxChange('preferredWorkLocations')}
                    className="mr-2"
                />
                Onsite
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="preferredWorkLocations"
                    value="Hybrid"
                    checked={values.preferredWorkLocations.includes('Hybrid')}
                    onChange={handleCheckboxChange('preferredWorkLocations')}
                    className="mr-2"
                />
                Hybrid
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="preferredWorkLocations"
                    value="Remote"
                    checked={values.preferredWorkLocations.includes('Remote')}
                    onChange={handleCheckboxChange('preferredWorkLocations')}
                    className="mr-2"
                />
                Remote
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

export default Step6JobPreference;