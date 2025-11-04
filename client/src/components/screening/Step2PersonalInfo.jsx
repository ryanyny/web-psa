import React, { useState, useEffect, useCallback } from 'react';
import { email as emailAPI } from '../../http/index';

// Custom hook untuk debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

const Step2PersonalInfo = ({ prevStep, nextStep, handleChange, handleValueChange, values }) => {
  const [showValidation, setShowValidation] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [emailError, setEmailError] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce email input (500ms delay)
  const debouncedEmail = useDebounce(values.email, 500);

  // Function untuk cek email ke database
  const checkEmailInDB = useCallback(async (email) => {
    if (!email || email.trim() === '') {
      setEmailError('');
      setEmailValid(false);
      return false;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid');
      setEmailValid(false);
      return false;
    }

    setIsCheckingEmail(true);
    setEmailError('');

    try {
      const response = await emailAPI.checkEmail(email);
      const result = response.data;
      
      if (result.success) {
        if (result.exists) {
          setEmailError(result.message || 'Email sudah terdaftar. Silakan gunakan email lain.');
          setEmailValid(false);
          return false;
        } else {
          setEmailError('');
          setEmailValid(true);
          return true;
        }
      } else {
        setEmailError(result.message || 'Terjadi kesalahan saat memeriksa email');
        setEmailValid(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailError('Terjadi kesalahan koneksi. Coba lagi.');
      setEmailValid(false);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  }, []);

  // Effect untuk cek email ketika debounced email berubah
  useEffect(() => {
    if (debouncedEmail && touchedFields.email) {
      checkEmailInDB(debouncedEmail);
    } else if (!debouncedEmail) {
      setEmailError('');
      setEmailValid(false);
    }
  }, [debouncedEmail, checkEmailInDB, touchedFields.email]);

  const continueStep = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Reset email error
      setEmailError('');
      
      // Validasi semua field wajib diisi
      const isInvalid = !values.email || !values.fullName || !values.nickName || !values.gender || 
                       !values.birthDate || !values.socialMedia || !values.linkedin || !values.province || 
                       !values.city || !values.addressByKtp || !values.CurrentAddress || !values.phone;
      
      if (isInvalid) {
        setShowValidation(true);
        setIsSubmitting(false);
        return;
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        setEmailError('Format email tidak valid');
        setShowValidation(true);
        setIsSubmitting(false);
        return;
      }

      // Force check email sekali lagi sebelum submit
      const isEmailValid = await checkEmailInDB(values.email);
      
      if (!isEmailValid) {
        setShowValidation(true);
        setIsSubmitting(false);
        return;
      }

      // Reset validation state jika valid
      setShowValidation(false);
      // Lanjut ke step berikutnya (save akan dilakukan di parent)
      nextStep();

    } catch (error) {
      console.error('Error in continueStep:', error);
      setEmailError('Terjadi kesalahan. Silakan coba lagi.');
      setShowValidation(true);
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName) => (e) => {
    const value = e.target ? e.target.value : e;
    handleChange(fieldName)(value);
    // Tandai field sebagai sudah disentuh
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    
    // Reset email error ketika user mulai mengetik ulang
    if (fieldName === 'email' && emailError) {
      setEmailError('');
      setEmailValid(false);
    }
  };

  const handleRadioChange = (fieldName) => (value) => {
    handleValueChange(fieldName)(value);
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    setShowValidation(false);
  };

  const provinces = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung",
    "Kepulauan Bangka Belitung", "Kepulauan Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Daerah Istimewa Yogyakarta",
    "Jawa Timur", "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
    "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan",
    "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Tengah",
    "Papua Pegunungan", "Papua Selatan", "Papua Barat Daya"
  ];

  // Fungsi untuk mengecek apakah field harus menampilkan validasi
  const shouldShowValidation = (fieldName) => {
    return showValidation && !values[fieldName];
  };

  // Fungsi untuk mendapatkan class border berdasarkan status
  const getBorderClass = (fieldName) => {
    if (fieldName === 'email' && emailError) {
      return 'border-red-300 bg-red-50';
    }
    if (shouldShowValidation(fieldName)) {
      return 'border-red-300 bg-red-50';
    }
    return 'border-gray-300';
  };

  // Fungsi untuk mendapatkan class focus ring berdasarkan status
  const getFocusRingClass = (fieldName) => {
    if (fieldName === 'email' && emailError) {
      return 'focus:ring-red-500';
    }
    return 'focus:ring-blue-500';
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Identitas Pribadi</h2>

      {/* Input Fields */}
      <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
          <input 
            type="email" 
            id="email" 
            value={values.email} 
            onChange={handleFieldChange('email')} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${getFocusRingClass('email')} ${getBorderClass('email')}`} 
            placeholder="nama@email.com" 
            disabled={isSubmitting}
          />
          {/* Loading indicator untuk email check */}
          {isCheckingEmail && (
            <p className="mt-2 text-xs text-blue-600 flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memeriksa ketersediaan email...
            </p>
          )}
          {/* Pesan error untuk email yang sudah terdaftar */}
          {emailError && (
            <p className="mt-2 text-xs text-red-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {emailError}
            </p>
          )}
          {/* Pesan sukses untuk email tersedia */}
          {emailValid && !emailError && !isCheckingEmail && touchedFields.email && (
            <p className="mt-2 text-xs text-green-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Email tersedia
            </p>
          )}
          {/* Pesan error untuk email kosong */}
          {shouldShowValidation('email') && !emailError && (
            <p className="mt-2 text-xs text-red-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Email wajib diisi
            </p>
          )}
      </div>

      <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">Nama Lengkap *</label>
          <input 
            type="text" 
            id="fullName" 
            value={values.fullName} 
            onChange={handleFieldChange('fullName')} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('fullName')}`} 
            placeholder="Masukkan nama lengkap" 
            disabled={isSubmitting}
          />
          {shouldShowValidation('fullName') && (
            <p className="mt-2 text-xs text-red-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Nama lengkap wajib diisi
            </p>
          )}
      </div>

      <div>
          <label htmlFor="nickName" className="block text-sm font-medium mb-2">Nama Panggilan *</label>
          <input 
            type="text" 
            id="nickName" 
            value={values.nickName} 
            onChange={handleFieldChange('nickName')} 
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('nickName')}`} 
            placeholder="Masukkan nama panggilan" 
            disabled={isSubmitting}
          />
          {shouldShowValidation('nickName') && (
            <p className="mt-2 text-xs text-red-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Nama panggilan wajib diisi
            </p>
          )}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium mb-2">Jenis Kelamin *</label>
        <div className={`p-3 rounded-lg border-2 ${
          shouldShowValidation('gender') 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-200'
        }`}>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="genderMale"
                name="gender"
                value="Laki-Laki"
                checked={values.gender === 'Laki-Laki'}
                onChange={() => handleRadioChange('gender')('Laki-Laki')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                disabled={isSubmitting}
              />
              <label htmlFor="genderMale" className="ml-2 block text-sm text-gray-700">Laki-Laki</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="genderFemale"
                name="gender"
                value="Perempuan"
                checked={values.gender === 'Perempuan'}
                onChange={() => handleRadioChange('gender')('Perempuan')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                disabled={isSubmitting}
              />
              <label htmlFor="genderFemale" className="ml-2 block text-sm text-gray-700">Perempuan</label>
            </div>
          </div>
        </div>
        {shouldShowValidation('gender') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Jenis kelamin wajib dipilih
          </p>
        )}
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium mb-2">Tanggal Lahir *</label>
        <input 
          type="date" 
          id="birthDate" 
          value={values.birthDate} 
          onChange={handleFieldChange('birthDate')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('birthDate')}`} 
          disabled={isSubmitting}
        />
        {shouldShowValidation('birthDate') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tanggal lahir wajib diisi
          </p>
        )}
      </div>

      <div>
        <label htmlFor="socialMedia" className="block text-sm font-medium mb-2">Link Akun Sosial Media (instagram / tiktok) *</label>
        <input 
          type="text" 
          id="socialMedia" 
          value={values.socialMedia} 
          onChange={handleFieldChange('socialMedia')} 
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('socialMedia')}`} 
          placeholder="Masukkan akun media sosial" 
          disabled={isSubmitting}
        />
        {shouldShowValidation('socialMedia') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Link sosial media wajib diisi
          </p>
        )}
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium mb-2">Link Akun Sosial Media Professional (LinkedIn)*</label>
        <input 
          type="text" 
          id="linkedin" 
          value={values.linkedin} 
          onChange={handleFieldChange('linkedin')} 
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('linkedin')}`} 
          placeholder="Masukkan akun LinkedIn" 
          disabled={isSubmitting}
        />
        {shouldShowValidation('linkedin') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Link LinkedIn wajib diisi
          </p>
        )}
      </div>

      <div>
        <label htmlFor="province" className="block text-sm font-medium mb-2">Provinsi *</label>
        <select
          name="province"
          id="province"
          value={values.province}
          onChange={handleFieldChange('province')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('province')}`}
          disabled={isSubmitting}
        >
          <option value="">Pilih Provinsi</option>
          {provinces.map(prov => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
        {shouldShowValidation('province') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Provinsi wajib dipilih
          </p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium mb-2">Kota/Kabupaten *</label>
        <input 
          type="text" 
          id="city" 
          value={values.city} 
          onChange={handleFieldChange('city')} 
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('city')}`} 
          placeholder="Masukkan Kota/Kabupaten" 
          disabled={isSubmitting}
        />
        {shouldShowValidation('city') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Kota/Kabupaten wajib diisi
          </p>
        )}
      </div>

      <div>
        <label htmlFor="addressByKtp" className="block text-sm font-medium mb-2">Alamat Lengkap Sesuai KTP *</label>
        <input 
          type="text" 
          id="addressByKtp" 
          value={values.addressByKtp} 
          onChange={handleFieldChange('addressByKtp')} 
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('addressByKtp')}`} 
          placeholder="Masukkan Alamat Lengkap" 
          disabled={isSubmitting}
        />
        {shouldShowValidation('addressByKtp') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Alamat KTP wajib diisi
          </p>
        )}
      </div>

      <div>
        <label htmlFor="CurrentAddress" className="block text-sm font-medium mb-2">Alamat Lengkap Sesuai Domisili Saat Ini (jika sama dengan KTP maka copy-paste saja) *</label>
        <input 
          type="text" 
          id="CurrentAddress" 
          value={values.CurrentAddress} 
          onChange={handleFieldChange('CurrentAddress')} 
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('CurrentAddress')}`} 
          placeholder="Masukkan Alamat Saat Ini" 
          disabled={isSubmitting}
        />
        {shouldShowValidation('CurrentAddress') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Alamat saat ini wajib diisi
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">Nomor Telepon *</label>
        <input 
          type="tel" 
          id="phone" 
          value={values.phone} 
          onChange={handleFieldChange('phone')} 
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getBorderClass('phone')}`} 
          placeholder="08xxxxxxxxxx" 
          disabled={isSubmitting}
        />
        {shouldShowValidation('phone') && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Nomor telepon wajib diisi
          </p>
        )}
      </div>
      
      <div className="flex justify-between pt-4">
        <button type="button" onClick={prevStep} className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition" disabled={isSubmitting}>
          &larr; Kembali
        </button>
        <button 
          type="submit" 
          className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={isSubmitting || isCheckingEmail}
        >
          {isSubmitting ? 'Menyimpan...' : 'Berikutnya →'}
        </button>
      </div>
    </form>
  );
};

export default Step2PersonalInfo;