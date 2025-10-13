// import React, { useState } from 'react';

const Step2PersonalInfo = ({ prevStep, nextStep, handleChange, values }) => {

  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (
      !values.email ||
      !values.fullName ||
      !values.nickName ||
      !values.gender ||
      !values.birthDate ||
      !values.socialMedia ||
      !values.linkedin ||
      !values.province ||
      !values.city ||
      !values.addressByKtp ||
      !values.CurrentAddress ||
      !values.phone
    ) {
      alert('Harap isi semua field yang wajib diisi.');
      return;
    }
    nextStep();
  };

  const provinces = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung",
    "Kepulauan Bangka Belitung", "Kepulauan Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Daerah Istimewa Yogyakarta",
    "Jawa Timur", "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
    "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan",
    "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Tengah",
    "Papua Pegunungan", "Papua Selatan", "Papua Barat Daya"
];

  return (
    <form onSubmit={continueStep} className="space-y-6">

      {/* Input Fields */}
      <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
          <input type="email" id="email" value={values.email} onChange={handleChange('email')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="nama@email.com" />
      </div>
      <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">Nama Lengkap *</label>
          <input type="text" id="fullName" value={values.fullName} onChange={handleChange('fullName')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama lengkap" />
      </div>
      <div>
          <label htmlFor="nickName" className="block text-sm font-medium mb-2">Nama Panggilan *</label>
          <input type="text" id="nickName" value={values.nickName} onChange={handleChange('nickName')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama panggilan" />
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium mb-2">Jenis Kelamin *</label>
        <div className="flex flex-col">
            <div>
                <input type="radio" id="genderMale" name="gender" value="Laki-Laki" onChange={handleChange('gender')} required className="" />
                <label htmlFor="genderMale" className="ml-2">Laki-laki</label>
            </div>
            <div> 
                <input type="radio" id="genderFemale" name="gender" value="Perempuan" onChange={handleChange('gender')} required className="" />
                <label htmlFor="genderFemale" className="ml-2">Perempuan</label>
            </div>
        </div>
      </div>
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium mb-2">Tanggal Lahir *</label>
        <input type="date" id="birthDate" value={values.birthDate} onChange={handleChange('birthDate')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label htmlFor="socialMedia" className="block text-sm font-medium mb-2">Link Akun Sosial Media (instagram / tiktok) *</label>
        <input type="text" id="socialMedia" value={values.socialMedia} onChange={handleChange('socialMedia')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan akun media sosial" />
      </div>
        <div>
        <label htmlFor="linkedin" className="block text-sm font-medium mb-2">Link Akun Sosial Media Professional (LinkedIn)*</label>
        <input type="text" id="linkedin" value={values.linkedin} onChange={handleChange('linkedin')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan akun LinkedIn" />
      </div>
        <div>
            <label htmlFor="province" className="block text-sm font-medium mb-2">Provinsi *</label>
            <select
                name="province"
                id="province"
                value={values.province}
                onChange={handleChange('province')}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Pilih Provinsi</option>
                {provinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                ))}
            </select>
        </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium mb-2">Kota/Kabupaten *</label>
        <input type="text" id="city" value={values.city} onChange={handleChange('city')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan Kota/Kabupaten" />
      </div>
      <div>
        <label htmlFor="addressByKtp" className="block text-sm font-medium mb-2">Alamat Lengkap Sesuai KTP *</label>
        <input type="text" id="addressByKtp" value={values.addressByKtp} onChange={handleChange('addressByKtp')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan Alamat Lengkap" />
      </div>
      <div>
        <label htmlFor="CurrentAddress" className="block text-sm font-medium mb-2">Alamat Lengkap Sesuai Domisili Saat Ini (jika sama dengan KTP maka copy-paste saja) *</label>
        <input type="text" id="CurrentAddress" value={values.CurrentAddress} onChange={handleChange('CurrentAddress')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan Alamat Saat Ini" />
      </div>
      <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">Nomor Telepon *</label>
          <input type="tel" id="phone" value={values.phone} onChange={handleChange('phone')} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="08xxxxxxxxxx" />
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

export default Step2PersonalInfo;