import React, { useState } from 'react';

const Step6JobPreference = ({ prevStep, nextStep, handleCheckboxChange, values }) => {
  const [showValidation, setShowValidation] = useState(false);
  const [setTouchedFields] = useState({});

  const continueStep = (e) => {
    e.preventDefault();
    
    // Validasi semua field wajib
    const isInvalid = values.jobType.length === 0 || 
                     values.jobField.length === 0 || 
                     values.preferredWorkLocations.length === 0;
    
    if (isInvalid) {
      setShowValidation(true);
      return;
    }
    
    // Reset validation state jika valid
    setShowValidation(false);
    nextStep();
  };

  const handleCheckboxGroupChange = (fieldName) => (e) => {
    handleCheckboxChange(fieldName)(e);
    // Tandai field sebagai sudah disentuh
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    setShowValidation(false);
  };

  // Fungsi untuk mengecek apakah field harus menampilkan validasi
  const shouldShowValidation = (fieldName) => {
    return showValidation && values[fieldName].length === 0;
  };

  // Fungsi untuk mendapatkan class checkbox container
  const getCheckboxContainerClass = (fieldName) => {
    if (shouldShowValidation(fieldName)) {
      return 'border-2 border-red-300 bg-red-50 rounded-lg p-4 space-y-2';
    }
    return 'space-y-2';
  };

  // Fungsi untuk mendapatkan class checkbox label
  const getCheckboxLabelClass = (fieldName, value) => {
    const baseClass = "flex items-center p-2 rounded transition-colors";
    
    if (values[fieldName].includes(value)) {
      return `${baseClass} bg-blue-50 border border-blue-200`;
    }
    return `${baseClass} hover:bg-gray-50`;
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Prefensi Karir</h2>

      {/* Jenis Pekerjaan */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Jenis Pekerjaan yang diinginkan (bisa pilih lebih dari 1) *
        </label>
        <div className={getCheckboxContainerClass('jobType')}>
          <label className={getCheckboxLabelClass('jobType', 'Full Time')}>
            <input
              type="checkbox"
              name="jobType"
              value="Full Time"
              checked={values.jobType.includes('Full Time')}
              onChange={handleCheckboxGroupChange('jobType')}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center">
              Full Time
            </span>
          </label>

          <label className={getCheckboxLabelClass('jobType', 'Part Time')}>
            <input
              type="checkbox"
              name="jobType"
              value="Part Time"
              checked={values.jobType.includes('Part Time')}
              onChange={handleCheckboxGroupChange('jobType')}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center">
              Part Time
            </span>
          </label>

          <label className={getCheckboxLabelClass('jobType', 'FreeLance')}>
            <input
              type="checkbox"
              name="jobType"
              value="FreeLance"
              checked={values.jobType.includes('FreeLance')}
              onChange={handleCheckboxGroupChange('jobType')}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center">
              FreeLance
            </span>
          </label>

          <label className={getCheckboxLabelClass('jobType', 'Internship/Magang')}>
            <input
              type="checkbox"
              name="jobType"
              value="Internship/Magang"
              checked={values.jobType.includes('Internship/Magang')}
              onChange={handleCheckboxGroupChange('jobType')}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center">
              Internship/Magang
            </span>
          </label>

          <label className={getCheckboxLabelClass('jobType', 'Project-based')}>
            <input
              type="checkbox"
              name="jobType"
              value="Project-based"
              checked={values.jobType.includes('Project-based')}
              onChange={handleCheckboxGroupChange('jobType')}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center">
              Project-based
            </span>
          </label>
        </div>

        {/* Validation message */}
        {shouldShowValidation('jobType') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih minimal satu jenis pekerjaan
          </p>
        )}
      </div>

      {/* Bidang Pekerjaan */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Bidang Pekerjaan yang diinginkan (bisa pilih lebih dari 1) *
        </label>
        <div className={getCheckboxContainerClass('jobField')}>
          {[
            'Teknologi & Digital',
            'Keuangan & Akuntansi',
            'Manufaktur & Teknik',
            'Kesehatan & Wellness',
            'Pendidikan & Pelatihan',
            'Logistik & Supply Chain',
            'Pariwisata, Hospitality & Lifestyle',
            'Komunikasi & Media',
            'Pemerintahan & NGO',
            'Pertanian, Kehutanan & Lingkungan'
          ].map((field) => (
            <label key={field} className={getCheckboxLabelClass('jobField', field)}>
              <input
                type="checkbox"
                name="jobField"
                value={field}
                checked={values.jobField.includes(field)}
                onChange={handleCheckboxGroupChange('jobField')}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="flex items-center">
                {field}
              </span>
            </label>
          ))}
        </div>

        {/* Validation message */}
        {shouldShowValidation('jobField') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih minimal satu bidang pekerjaan
          </p>
        )}
      </div>

      {/* Lokasi/Bentuk Kerja */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Lokasi / Bentuk Kerja yang diinginkan (bisa pilih lebih dari satu) *
        </label>
        <div className={getCheckboxContainerClass('preferredWorkLocations')}>
          {['Onsite', 'Hybrid', 'Remote'].map((location) => (
            <label key={location} className={getCheckboxLabelClass('preferredWorkLocations', location)}>
              <input
                type="checkbox"
                name="preferredWorkLocations"
                value={location}
                checked={values.preferredWorkLocations.includes(location)}
                onChange={handleCheckboxGroupChange('preferredWorkLocations')}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="flex items-center">
                {location}
              </span>
            </label>
          ))}
        </div>

        {/* Validation message */}
        {shouldShowValidation('preferredWorkLocations') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih minimal satu lokasi/bentuk kerja
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
       <div className="flex justify-between pt-6 border-t">
        <button 
          type="button" 
          onClick={prevStep} 
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          ← Kembali
        </button>
        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
          Berikutnya &rarr;
        </button>
      </div>
    </form>
  );
};

export default Step6JobPreference;