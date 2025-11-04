import React, { useState } from 'react';

const Step1Alumni = ({ nextStep, handleValueChange, values }) => {
  const [showValidation, setShowValidation] = useState(false);

  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (!values.alumni) {
      setShowValidation(true);
      // alert('Harap pilih salah satu.');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      {/* Pas Foto */}
      <div>
        <label className="block text-sm font-medium mb-2">Kamu Alumni dari Program apa? *</label>
        <div className="space-y-4 mt-2">
            <div className="flex items-center">
                <input
                    type="radio"
                    name="alumni"
                    id="CGA"
                    value="Community Growth Accelerator"
                    checked={values.alumni === 'Community Growth Accelerator'}
                    onChange={() => handleValueChange('alumni')('Community Growth Accelerator')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="CGA" className="ml-2 block text-sm text-gray-700">Community Growth Accelerator</label>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    name="alumni"
                    id="PBL"
                    value="Project Based Learning"
                    checked={values.alumni === 'Project Based Learning'}
                    onChange={() => handleValueChange('alumni')('Project Based Learning')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="PBL" className="ml-2 block text-sm text-gray-700">Project Based Learning</label>
            </div>
        </div>
        {showValidation && (
          <p className="mt-2 text-xs text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Pilihan wajib diisi sebelum melanjutkan
          </p>
        )}
      </div>
      
      <div className="flex justify-end pt-4">
        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
          Berikutnya &rarr;
        </button>
      </div>
    </form>
  );
};

export default Step1Alumni;