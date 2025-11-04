import { useState, useEffect } from 'react';
import SkillRatingInput from './SkillRatingInput';
import LevelIndicator from './LevelIndicator';

const Step4SkillRating = ({ prevStep, nextStep, handleChange, values }) => {
  const [missingSkills, setMissingSkills] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Mapping skill keys -> label
  const skillMap = {
    communicationSkill: 'Communication & Public Speaking',
    publicSpeakingSkill: 'Problem Solving',
    criticalThinkingSkill: 'Critical Thinking',
    teamworkSkill: 'Teamwork & Collaboration',
    emotionalIntelligenceSkill: 'Emotional Intelligence',
    adaptabilitySkill: 'Adaptability',
    creativitySkill: 'Creativity & Innovation',
    timeManagementSkill: 'Time Management',
    negotiationSkill: 'Negotiation Skill',
    MicrosoftOffice: 'Microsoft Office',
    GoogleWorkspace: 'Google Workspace',
    LearningManagementSystem: 'Learning Management System',
    SocialMediaManagement: 'Social Media Management',
    AIProductivityTools: 'AI Tools for Productivity',
    CybersecurityAwareness: 'Cybersecurity Awareness',
    CloudCollaboration: 'Cloud Collaboration',
    ProjectManagement: 'Project Management',
    PeopleManagement: 'People Management & Coaching',
    StrategicThinking: 'Strategic Thinking',
    BusinessDevelopment: 'Business Development & Sales',
    ConflictResolution: 'Conflict Resolution',
    DecisionMaking: 'Decision Making'
  };

  // Check for missing skills whenever values change
  useEffect(() => {
    const requiredSkills = Object.keys(skillMap);
    const missing = requiredSkills.filter(k => {
      const v = values[k];
      return v === undefined || v === null || v === '' || v === 0;
    });
    
    const labels = missing.map(k => skillMap[k] || k);
    setMissingSkills(labels);
    
    // Show alert if there are missing skills, hide if all are filled
    if (missing.length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [values]);

  const continueStep = (e) => {
    e.preventDefault();

    // Check hard skill
    if (!values.hardskill || values.hardskill.trim() === '') {
      alert('Harap isi Hard Skills (Technical) terlebih dahulu');
      const hardskillInput = document.getElementById('hardskill');
      if (hardskillInput) {
        hardskillInput.focus();
      }
      return;
    }

    // Check all skill ratings
    if (missingSkills.length > 0) {
      setShowAlert(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If all valid, proceed to next step
    nextStep();
  };

  // const closeAlert = () => {
  //   setShowAlert(false);
  // };

  return (
    <form onSubmit={continueStep} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kompetensi Utama (Skillset)</h2>

      {/* Alert untuk skill yang belum diisi */}
      {showAlert && missingSkills.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg shadow-sm animate-pulse">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <strong className="text-red-900 text-lg">Perhatian: Skill Belum Lengkap</strong>
              </div>
              <p className="text-red-700 mb-3">Silakan beri penilaian untuk semua skill berikut sebelum melanjutkan:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {missingSkills.map((label) => (
                  <div key={label} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* <button 
              type="button" 
              onClick={closeAlert}
              className="ml-4 text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
          </div>
        </div>
      )}

      {/* Floating notification banner */}
      {/* {showAlert && missingSkills.length > 0 && (
        <div className="fixed right-6 top-6 z-50 animate-bounce">
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="bg-white text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              {missingSkills.length}
            </div>
            <div>
              <div className="font-semibold">Skill Belum Dinilai</div>
              <div className="text-xs opacity-90">Klik untuk melihat detail</div>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Lihat
            </button>
          </div>
        </div>
      )} */}

      <div>
        <label htmlFor="hardskill" className="block text-sm font-medium mb-2">Hard Skills (Technical)</label>
        <input type="text" id="hardskill" value={values.hardskill} onChange={handleChange('hardskill')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan hard skills" />
      </div>
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Soft Skill (Behavioral)</h3> 
        <LevelIndicator />
        <SkillRatingInput name="communicationSkill" label="Communication & Public Speaking" value={values.communicationSkill} onChange={handleChange} />
        <SkillRatingInput name="publicSpeakingSkill" label="Problem Solving" value={values.publicSpeakingSkill} onChange={handleChange} />
        <SkillRatingInput name="criticalThinkingSkill" label="Critical Thinking" value={values.criticalThinkingSkill} onChange={handleChange} />
        <SkillRatingInput name="teamworkSkill" label="Teamwork & Collaboration" value={values.teamworkSkill} onChange={handleChange} />
        <SkillRatingInput name="emotionalIntelligenceSkill" label="Emotional Intelligence" value={values.emotionalIntelligenceSkill} onChange={handleChange} />
        <SkillRatingInput name="adaptabilitySkill" label="Adaptability" value={values.adaptabilitySkill} onChange={handleChange} />
        <SkillRatingInput name="creativitySkill" label="Creativity & Innovation" value={values.creativitySkill} onChange={handleChange} />
        <SkillRatingInput name="timeManagementSkill" label="Time Management" value={values.timeManagementSkill} onChange={handleChange} />
        <SkillRatingInput name="negotiationSkill" label="Negotiation Skill" value={values.negotiationSkill} onChange={handleChange} />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Digital Skill</h3>
        <LevelIndicator />
        <SkillRatingInput name="MicrosoftOffice" label="Microsoft Office (Word, Excel, PowerPoint)" value={values.MicrosoftOffice} onChange={handleChange} />
        <SkillRatingInput name="GoogleWorkspace" label="Google Workspace (Docs, Sheets, Slides)" value={values.GoogleWorkspace} onChange={handleChange} />
        <SkillRatingInput name="LearningManagementSystem" label="Learning Management System (LMS)" value={values.LearningManagementSystem} onChange={handleChange} />
        <SkillRatingInput name="SocialMediaManagement" label="Social Media Management" value={values.SocialMediaManagement} onChange={handleChange} />
        <SkillRatingInput name="AIProductivityTools" label="AI Tools for Productivity (ChatGPT, MidJourney, dsb.)" value={values.AIProductivityTools} onChange={handleChange} />
        <SkillRatingInput name="CybersecurityAwareness" label="Cybersecurity Awareness" value={values.CybersecurityAwareness} onChange={handleChange} />
        <SkillRatingInput name="CloudCollaboration" label="Cloud Collaboration (Drive, OneDrive, Slack, Trello)" value={values.CloudCollaboration} onChange={handleChange} />
      </div>
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Managerial / Leadership Skill</h3>
        <LevelIndicator />
        <SkillRatingInput name="ProjectManagement" label="Project Management (Agile, Scrum, Waterfall)" value={values.ProjectManagement} onChange={handleChange} />
        <SkillRatingInput name="PeopleManagement" label="People Management & Coaching" value={values.PeopleManagement} onChange={handleChange} />
        <SkillRatingInput name="StrategicThinking" label="Strategic Thinking" value={values.StrategicThinking} onChange={handleChange} />
        <SkillRatingInput name="BusinessDevelopment" label="Business Development & Sales" value={values.BusinessDevelopment} onChange={handleChange} />
        <SkillRatingInput name="ConflictResolution" label="Conflict Resolution" value={values.ConflictResolution} onChange={handleChange} />
        <SkillRatingInput name="DecisionMaking" label="Decision Making" value={values.DecisionMaking} onChange={handleChange} />
      </div>

      <div className="flex justify-between items-center pt-4">
        <button type="button" onClick={prevStep} className="px-8 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
          &larr; Kembali
        </button>
        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
          Berikutnya &rarr;
        </button>
      </div>
      <style>{`.skill-rating-option:hover { transform: scale(1.05); } .skill-rating-option.selected { background: #3b82f6; color: white; border-color: #3b82f6; }`}</style>
    </form>
  );
};

export default Step4SkillRating;