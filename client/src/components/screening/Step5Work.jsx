import { useState } from 'react';
import FileInputDisplay from './FileInputDisplay';

// KOMPONEN UTAMA
const Step5Work = ({ prevStep, nextStep, handleChange, handleCheckboxChange, handleFileChange, handleFileRemove, values }) => {
  const [showValidation, setShowValidation] = useState(false);
  const [setTouchedFields] = useState({});

  const continueStep = (e) => {
    e.preventDefault();
    
    // Validasi semua field wajib
    const isInvalid = values.currentStatus.length === 0 || 
                     !values.experiences || 
                     !values.photo || 
                     !values.cv || 
                     !values.portfolio;
    
    if (isInvalid) {
      setShowValidation(true);
      return;
    }
    
    // Reset validation state jika valid
    setShowValidation(false);
    nextStep();
  };

  const handleFieldChange = (fieldName) => (e) => {
    handleChange(fieldName)(e);
    // Tandai field sebagai sudah disentuh
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    setShowValidation(false);
  };

  const handleCheckboxGroupChange = (fieldName) => (e) => {
    handleCheckboxChange(fieldName)(e);
    // Tandai checkbox group sebagai sudah disentuh
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    setShowValidation(false);
  };

  // Fungsi untuk mengecek apakah field harus menampilkan validasi
  const shouldShowValidation = (fieldName) => {
    return showValidation && !values[fieldName];
  };

  // Fungsi untuk mendapatkan class border berdasarkan status
  const getBorderClass = (fieldName) => {
    if (shouldShowValidation(fieldName)) {
      return 'border-red-300 bg-red-50';
    }
    return 'border-gray-300';
  };

  // Fungsi untuk mendapatkan class checkbox container
  const getCheckboxContainerClass = () => {
    if (showValidation && values.currentStatus.length === 0) {
      return 'border-2 border-red-300 bg-red-50 rounded-lg p-4';
    }
    return 'space-y-2';
  };

  // Fungsi untuk mendapatkan class checkbox label
  const getCheckboxLabelClass = (statusValue) => {
    const baseClass = "flex items-center p-2 rounded transition-colors";
    
    if (values.currentStatus.includes(statusValue)) {
      return `${baseClass} bg-blue-50 border border-blue-200`;
    }
    return `${baseClass} hover:bg-gray-50`;
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Pengalaman Kerja/Projek</h2>
      
      {/* Status Saat Ini */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Status saat ini *
        </label>
        <div className={getCheckboxContainerClass()}>
          {/* Pernah Magang */}
          <label className={getCheckboxLabelClass('Pernah Magang')}>
            <input
              type="checkbox"
              value="Pernah Magang"
              checked={values.currentStatus.includes('Pernah Magang')}
              onChange={handleCheckboxGroupChange('currentStatus')}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
            />
            <span className="flex items-center">
              Pernah Magang
            </span>
          </label>

          {/* Pernah Freelance */}
          <label className={getCheckboxLabelClass('Pernah Freelance')}>
            <input
              type="checkbox"
              value="Pernah Freelance"
              checked={values.currentStatus.includes('Pernah Freelance')}
              onChange={handleCheckboxGroupChange('currentStatus')}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
            />
            <span className="flex items-center">
              Pernah Freelance
            </span>
          </label>

          {/* Pernah Kerja Tetap */}
          <label className={getCheckboxLabelClass('Pernah Kerja Tetap')}>
            <input
              type="checkbox"
              value="Pernah Kerja Tetap"
              checked={values.currentStatus.includes('Pernah Kerja Tetap')}
              onChange={handleCheckboxGroupChange('currentStatus')}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
            />
            <span className="flex items-center">
              Pernah Kerja Tetap
            </span>
          </label>
        </div>

        {/* Validation message untuk checkbox group */}
        {showValidation && values.currentStatus.length === 0 && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih minimal satu status
          </p>
        )}
      </div>
      
      {/* Pengalaman Kerja */}
      <div>
        <label htmlFor="experiences" className="block text-sm font-medium mb-2">
          Ceritakan pengalaman kerja / proyek terakhir kamu dan hasil akhirnya / impact-nya bagaimana (boleh cerita lebih dari satu) *
        </label>
        <div className="relative">
          <textarea 
            id="experiences" 
            value={values.experiences} 
            onChange={handleFieldChange('experiences')} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('experiences')}`} 
            placeholder="Ceritakan pengalaman kerja / proyek terakhir kamu..."
            rows="5"
          ></textarea>
          
          {/* Character count */}
          {values.experiences && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
              {values.experiences.length} karakter
            </div>
          )}
        </div>
        
        {shouldShowValidation('experiences') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pengalaman kerja wajib diisi
          </p>
        )}
      </div>

      {/* File Upload Sections */}
      <div className="space-y-4">
        <FileInputDisplay
          name="photo"
          label="Pas Photo"
          value={values.photo}
          handleFileChange={handleFileChange}
          handleFileRemove={handleFileRemove}
          required={true}
          showValidation={showValidation}
        />

        <FileInputDisplay
          name="cv"
          label="Curriculum Vitae ATS Kamu"
          value={values.cv}
          handleFileChange={handleFileChange}
          handleFileRemove={handleFileRemove}
          required={true}
          showValidation={showValidation}
        />

        <FileInputDisplay
          name="portfolio"
          label="Portofolio Kreatif Kamu"
          value={values.portfolio}
          handleFileChange={handleFileChange}
          handleFileRemove={handleFileRemove}
          required={true}
          showValidation={showValidation}
        />
      </div>
      
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

export default Step5Work;