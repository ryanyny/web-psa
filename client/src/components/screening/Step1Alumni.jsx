// import React, { useState } from 'react';

const Step1Alumni = ({ nextStep, handleValueChange, values }) => {

  const continueStep = (e) => {
    e.preventDefault();
    // Validasi sederhana sebelum lanjut
    if (!values.alumni) {
      alert('Harap pilih salah satu.');
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
                    value="Community Growth Accelerator"
                    checked={values.alumni === 'Community Growth Accelerator'}
                    onChange={() => handleValueChange('alumni')('Community Growth Accelerator')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Community Growth Accelerator</label>
            </div>
            <div className="flex items-center">
                <input
                    type="radio"
                    name="alumni"
                    value="Project Based Learning"
                    checked={values.alumni === 'Project Based Learning'}
                    onChange={() => handleValueChange('alumni')('Project Based Learning')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-700">Project Based Learning</label>
            </div>
        </div>
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