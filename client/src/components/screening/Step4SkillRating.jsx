import React from 'react';
import SkillRatingInput from './SkillRatingInput';
import LevelIndicator from './LevelIndicator';

const Step4SkillRating = ({ prevStep, nextStep, handleChange, values, }) => {

  const continueStep = (e) => {
  e.preventDefault();
  // Daftar semua skill yang wajib diisi
  const requiredSkills = [
    'communicationSkill', 'publicSpeakingSkill', 'criticalThinkingSkill', 'teamworkSkill',
    'emotionalIntelligenceSkill', 'adaptabilitySkill', 'creativitySkill', 'timeManagementSkill',
    'negotiationSkills', 'MicrosoftOffice', 'GoogleWorkspace', 'LearningManagementSystem',
    'SocialMediaManagement', 'AIProductivityTools', 'CybersecurityAwareness', 'CloudCollaboration',
    'ProjectManagement', 'PeopleManagement', 'StrategicThinking', 'BusinessDevelopment',
    'ConflictResolution', 'DecisionMaking'
  ];
  // Cek apakah ada skill yang belum diisi
  const isAnySkillMissing = requiredSkills.some(skill => !values[skill]);

  if (isAnySkillMissing) {
    alert('Harap isi semua penilaian skill.');
    return;
  }

  nextStep();
};

  return (
    <form onSubmit={continueStep} className="space-y-6">
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
        <SkillRatingInput name="negotiationSkills" label="Negotiation Skills" value={values.negotiationSkills} onChange={handleChange} />
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