import React, { useState } from 'react';
import FileInputDisplay from './FileInputDisplay';

const Step7JobReadiness = ({ prevStep, nextStep, handleValueChange, handleFileChange, handleFileRemove, values }) => {
  const [showValidation, setShowValidation] = useState(false);
  const [setTouchedFields] = useState({});

  const continueStep = (e) => {
    e.preventDefault();
    
    // Validasi semua field wajib
    const isInvalid = !values.workReadiness || 
                     !values.willingToRelocate || 
                     !values.identity;
    
    if (isInvalid) {
      setShowValidation(true);
      return;
    }
    
    // Reset validation state jika valid
    setShowValidation(false);
    nextStep();
  };

  const handleRadioChange = (fieldName) => (value) => {
    handleValueChange(fieldName)(value);
    // Tandai field sebagai sudah disentuh
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    setShowValidation(false);
  };

  // Fungsi untuk mengecek apakah field harus menampilkan validasi
  const shouldShowValidation = (fieldName) => {
    return showValidation && !values[fieldName];
  };

  // Fungsi untuk mendapatkan class radio container
  const getRadioContainerClass = (fieldName) => {
    if (shouldShowValidation(fieldName)) {
      return 'border-2 border-red-300 bg-red-50 rounded-lg p-4 space-y-4';
    }
    return 'space-y-1 mt-2';
  };

  // Fungsi untuk mendapatkan class radio label
  const getRadioLabelClass = (fieldName, value) => {
    const baseClass = "flex items-center p-3 rounded transition-colors";
    
    if (values[fieldName] === value) {
      return `${baseClass} bg-blue-50 border border-blue-200`;
    }
    return `${baseClass} hover:bg-gray-50`;
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kesiapan Bekerja</h2>

      {/* Kapan Mulai Kerja */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Kapan bisa mulai kerja? *
        </label>
        <div className={getRadioContainerClass('workReadiness')}>
          <label className={getRadioLabelClass('workReadiness', 'Segera')}>
            <input
              type="radio"
              name="workReadiness"
              id="workReadiness1"
              value="Segera"
              checked={values.workReadiness === 'Segera'}
              onChange={() => handleRadioChange('workReadiness')('Segera')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-3 block text-sm text-gray-700 items-center">
              Segera
            </span>
          </label>

          <label className={getRadioLabelClass('workReadiness', 'Dalam 1 Bulan')}>
            <input
              type="radio"
              name="workReadiness"
              id="workReadiness2"
              value="Dalam 1 Bulan"
              checked={values.workReadiness === 'Dalam 1 Bulan'}
              onChange={() => handleRadioChange('workReadiness')('Dalam 1 Bulan')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-3 block text-sm text-gray-700 items-center">
              Dalam 1 Bulan
            </span>
          </label>

          <label className={getRadioLabelClass('workReadiness', 'Dalam 3 Bulan')}>
            <input
              type="radio"
              name="workReadiness"
              id="workReadiness3"
              value="Dalam 3 Bulan"
              checked={values.workReadiness === 'Dalam 3 Bulan'}
              onChange={() => handleRadioChange('workReadiness')('Dalam 3 Bulan')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-3 block text-sm text-gray-700 items-center">
              Dalam 3 Bulan
            </span>
          </label>
        </div>

        {/* Validation message */}
        {shouldShowValidation('workReadiness') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih kapan bisa mulai kerja
          </p>
        )}
      </div>

      {/* Bersedia Ditempatkan di Luar Kota */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Apakah bersedia ditempatkan di luar kota? *
        </label>
        <div className={getRadioContainerClass('willingToRelocate')}>
          <label className={getRadioLabelClass('willingToRelocate', 'Ya')}>
            <input
              type="radio"
              name="willingToRelocate"
              id="willingToRelocate1"
              value="Ya"
              checked={values.willingToRelocate === 'Ya'}
              onChange={() => handleRadioChange('willingToRelocate')('Ya')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-3 block text-sm text-gray-700 items-center">
              Ya
            </span>
          </label>

          <label className={getRadioLabelClass('willingToRelocate', 'Tidak')}>
            <input
              type="radio"
              name="willingToRelocate"
              id="willingToRelocate2"
              value="Tidak"
              checked={values.willingToRelocate === 'Tidak'}
              onChange={() => handleRadioChange('willingToRelocate')('Tidak')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-3 block text-sm text-gray-700 items-center">
              Tidak
            </span>
          </label>
        </div>

        {/* Validation message */}
        {shouldShowValidation('willingToRelocate') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih kesediaan untuk ditempatkan di luar kota
          </p>
        )}
      </div>

      {/* Kartu Identitas */}
      <FileInputDisplay
        name="identity"
        label="Kartu Identitas (KTP/SIM)"
        value={values.identity}
        handleFileChange={handleFileChange}
        handleFileRemove={handleFileRemove}
        required={true}
        showValidation={showValidation}
      />

      {/* Tombol Navigasi */}
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

export default Step7JobReadiness;