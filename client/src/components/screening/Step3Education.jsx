import { useState } from 'react';

const Step3Education = ({ prevStep, nextStep, handleChange, handleCheckboxChange, values }) => {
  const [showValidation, setShowValidation] = useState(false);
  const [setTouchedFields] = useState({});

  // Custom handler untuk checkbox sertifikasi - DIPERBAIKI
  const handleCertificateChange = (e) => {
    const { value, checked } = e.target;
    
    let newCertificates;
    
    if (value === 'Tidak Punya Sertifikasi') {
      // Jika "Tidak Punya Sertifikasi" di-check, uncheck semua yang lain
      if (checked) {
        newCertificates = ['Tidak Punya Sertifikasi'];
      } else {
        newCertificates = [];
      }
    } else {
      // Jika sertifikasi lain di-check
      if (checked) {
        // Hapus "Tidak Punya Sertifikasi" jika ada, dan tambahkan sertifikasi yang dipilih
        newCertificates = values.certificate
          .filter(cert => cert !== 'Tidak Punya Sertifikasi')
          .concat(value);
      } else {
        // Hapus sertifikasi yang di-uncheck
        newCertificates = values.certificate.filter(cert => cert !== value);
      }
    }
    
    // Langsung panggil handleChange dengan format sederhana
    const event = {
      target: {
        name: 'certificate',
        value: newCertificates
      }
    };
    
    // Coba handleChange dulu
    if (handleChange) {
      handleChange('certificate')(event);
    }
    
    // Jika ada handleCheckboxChange, panggil juga
    if (handleCheckboxChange) {
      try {
        handleCheckboxChange('certificate', newCertificates);
      } catch (error) {
        console.log('Using alternative update method');
      }
    }
    
    // Tandai field sebagai sudah disentuh
    setTouchedFields(prev => ({ ...prev, certificate: true }));
    setShowValidation(false);
  };

  const continueStep = (e) => {
    e.preventDefault();
    
    // Validasi semua field wajib
    const isInvalid = !values.educationLevel || 
                     !values.latestEducationalInstitution || 
                     !values.major || 
                     values.certificate.length === 0;
    
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
    if (showValidation && values.certificate.length === 0) {
      return 'border-2 border-red-300 bg-red-50 rounded-lg p-4';
    }
    return 'space-y-2';
  };

  // Fungsi untuk mendapatkan class label checkbox berdasarkan status
  const getCheckboxLabelClass = (certificateValue) => {
    const baseClass = "flex items-center p-3 rounded-lg transition-all cursor-pointer";
    
    if (values.certificate.includes(certificateValue)) {
      if (certificateValue === 'Tidak Punya Sertifikasi') {
        return `${baseClass} bg-orange-50 border-2 border-orange-300`;
      }
      return `${baseClass} bg-blue-50 border-2 border-blue-300`;
    }
    return `${baseClass} hover:bg-gray-50 border-2 border-gray-200`;
  };

  return (
    <form onSubmit={continueStep} className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pendidikan dan Sertifikasi</h2>

      {/* Pendidikan Terakhir */}
      <div>
        <label htmlFor="educationLevel" className="block text-sm font-medium mb-2 text-gray-700">
          Pendidikan Terakhir <span className="text-red-500">*</span>
        </label>
        <select 
          id="educationLevel" 
          value={values.educationLevel} 
          onChange={handleFieldChange('educationLevel')} 
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('educationLevel')}`}
        >
          <option value="">Pilih Pendidikan Terakhir</option>
          <option value="SMK/SMA/MA/Setara">SMK/SMA/MA/Setara</option>
          <option value="Diploma">Diploma</option>
          <option value="Sarjana">Sarjana</option>
          <option value="Magister">Magister</option>
        </select>
        {shouldShowValidation('educationLevel') && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pendidikan terakhir wajib dipilih
          </p>
        )}
      </div>

      {/* Asal Institusi */}
      <div>
        <label htmlFor="latestEducationalInstitution" className="block text-sm font-medium mb-2 text-gray-700">
          Asal Institusi/ Lembaga Pendidikan Terakhir <span className="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          id="latestEducationalInstitution" 
          value={values.latestEducationalInstitution} 
          onChange={handleFieldChange('latestEducationalInstitution')} 
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('latestEducationalInstitution')}`} 
          placeholder="Masukkan nama institusi" 
        />
        {shouldShowValidation('latestEducationalInstitution') && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Asal institusi wajib diisi
          </p>
        )}
      </div>

      {/* Jurusan */}
      <div>
        <label htmlFor="major" className="block text-sm font-medium mb-2 text-gray-700">
          Jurusan <span className="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          id="major" 
          value={values.major} 
          onChange={handleFieldChange('major')} 
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('major')}`} 
          placeholder="Masukkan jurusan" 
        />
        {shouldShowValidation('major') && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Jurusan wajib diisi
          </p>
        )}
      </div>

      {/* Sertifikasi */}
      <div>
        <label className="block text-sm font-medium mb-3 text-gray-700">
          Sertifikasi Kompetensi Yang Dimiliki <span className="text-red-500">*</span>
        </label>
        <div className={getCheckboxContainerClass()}>
          {/* Punya Skill Akademi */}
          <label className={getCheckboxLabelClass('Punya Skill Akademi (Sertifikasi Internal)')}>
            <input
              type="checkbox"
              name="certificate"
              value="Punya Skill Akademi (Sertifikasi Internal)"
              checked={values.certificate.includes('Punya Skill Akademi (Sertifikasi Internal)')}
              onChange={handleCertificateChange}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center flex-1">
              <span className="text-sm font-medium">Punya Skill Akademi (Sertifikasi Internal)</span>
            </span>
          </label>

          {/* BNSP */}
          <label className={getCheckboxLabelClass('BNSP (Sertifikasi Nasional)')}>
            <input
              type="checkbox"
              name="certificate"
              value="BNSP (Sertifikasi Nasional)"
              checked={values.certificate.includes('BNSP (Sertifikasi Nasional)')}
              onChange={handleCertificateChange}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center flex-1">
              <span className="text-sm font-medium">BNSP (Sertifikasi Nasional)</span>
            </span>
          </label>

          {/* Coursera */}
          <label className={getCheckboxLabelClass('Coursera (Sertifikasi Internasional)')}>
            <input
              type="checkbox"
              name="certificate"
              value="Coursera (Sertifikasi Internasional)"
              checked={values.certificate.includes('Coursera (Sertifikasi Internasional)')}
              onChange={handleCertificateChange}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center flex-1">
              <span className="text-sm font-medium">Coursera (Sertifikasi Internasional)</span>
            </span>
          </label>

          {/* Microsoft Office Specialist */}
          <label className={getCheckboxLabelClass('Microsoft Office Specialist (Sertifikasi Internasional)')}>
            <input
              type="checkbox"
              name="certificate"
              value="Microsoft Office Specialist (Sertifikasi Internasional)"
              checked={values.certificate.includes('Microsoft Office Specialist (Sertifikasi Internasional)')}
              onChange={handleCertificateChange}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center flex-1">
              <span className="text-sm font-medium">Microsoft Office Specialist (Sertifikasi Internasional)</span>
            </span>
          </label>

          {/* Tidak Punya Sertifikasi */}
          <label className={getCheckboxLabelClass('Tidak Punya Sertifikasi')}>
            <input
              type="checkbox"
              name="certificate"
              value="Tidak Punya Sertifikasi"
              checked={values.certificate.includes('Tidak Punya Sertifikasi')}
              onChange={handleCertificateChange}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex items-center flex-1">
              <span className="text-sm font-medium">Tidak Punya Sertifikasi</span>
            </span>
          </label>
        </div>
        
        {/* Validation message untuk checkbox group */}
        {showValidation && values.certificate.length === 0 && (
          <p className="mt-3 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilih minimal satu sertifikasi
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

export default Step3Education;