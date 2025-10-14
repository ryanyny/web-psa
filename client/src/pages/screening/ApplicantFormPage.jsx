import React, { useState } from "react";
import { Link } from "react-router-dom";
import applicants from "../../http/index.js";
import Step1Alumni from "../../components/screening/Step1Alumni.jsx";
import Step2PersonalInfo from "../../components/screening/Step2PersonalInfo.jsx";
import Step3Education from "../../components/screening/Step3Education.jsx";
import Step4SkillRating from "../../components/screening/Step4SkillRating.jsx";
import Step5Work from "../../components/screening/Step5Work.jsx";
import Step6JobPreference from "../../components/screening/Step6JobPreference.jsx";
import Step7JobReadiness from "../../components/screening/Step7JobReadiness.jsx";
import Step8Aggrement from "../../components/screening/Step8Aggrement.jsx";

const ApplicantFormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    alumni: "",
    email: "",
    fullName: "",
    nickName: "",
    gender: "",
    birthDate: "",
    socialMedia: "",
    linkedin: "",
    province: "",
    city: "",
    addressByKtp: "",
    CurrentAddress: "",
    phone: "",

    educationLevel: "",
    latestEducationalInstitution: "",
    major: "",
    certificate: [],

    hardskill: "",
    //Soft Skill (Behavioral)
    communicationSkill: null,
    publicSpeakingSkill: null,
    criticalThinkingSkill: null,
    teamworkSkill: null,
    emotionalIntelligenceSkill: null,
    adaptabilitySkill: null,
    creativitySkill: null,
    timeManagementSkill: null,
    negotiationSkills: null,

    //DIgital Skill
    MicrosoftOffice: null,
    GoogleWorkspace: null,
    LearningManagementSystem: null,
    SocialMediaManagement: null,
    AIProductivityTools: null,
    CybersecurityAwareness: null,
    CloudCollaboration: null,

    // Managerial/Leadership Skill
    ProjectManagement: null,
    PeopleManagement: null,
    StrategicThinking: null,
    BusinessDevelopment: null,
    ConflictResolution: null,
    DecisionMaking: null,

    currentStatus: [],
    experiences: "",
    photo: null,
    cv: null,
    portfolio: null,

    jobType: [],
    jobField: [],
    preferredWorkLocations: [],

    workReadiness: "",
    willingToRelocate: "",
    identity: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (input) => (e) => {
    // Cek apakah 'e' adalah event object dengan melihat keberadaan 'e.target'
    const value = e && e.target ? e.target.value : e;
    setFormData({ ...formData, [input]: value });
  };

  const handleValueChange = (input) => (value) => {
    setFormData({ ...formData, [input]: value });
  };

  const handlePhotoChange = (file) => {
    setFormData({ ...formData, photo: file });
  };

    const handleCheckboxChange = (input) => (e) => {
    const { value, checked } = e.target;

    // Ambil array yang ada saat ini dari state
    const currentArray = formData[input];

    if (checked) {
        // Jika checkbox dicentang, tambahkan nilainya ke dalam array
        setFormData({
        ...formData,
        [input]: [...currentArray, value],
        });
    } else {
        // Jika centang dihilangkan, hapus nilai tersebut dari array
        setFormData({
        ...formData,
        [input]: currentArray.filter((item) => item !== value),
        });
    }
    };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    const data = new FormData();
    for (const key in formData) {
      // ✅ PERBAIKAN: Kondisi diubah untuk mengizinkan nilai 0
      if (formData[key] !== null && formData[key] !== undefined) {
        // Khusus untuk array 'certificate', kita perlu menanganinya secara berbeda
        // jika backend tidak bisa langsung menerima array di FormData.
        if (key === 'certificate' && Array.isArray(formData[key])) {
          formData[key].forEach(certValue => {
            data.append('certificate[]', certValue); // Kirim sebagai array
          });
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await applicants.create(data);
      setMessage({ type: "success", text: response.message });
      setStep(9); // Pindah ke halaman sukses
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        "Gagal mengirim data. Pastikan semua field terisi.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Alumni
            nextStep={nextStep}
            handleValueChange={handleValueChange}
            values={formData}
          />
        );
      case 2:
        return (
          <Step2PersonalInfo
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
            loading={loading}
          />
        );
        case 3:
        return (
          <Step3Education
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            values={formData}
            loading={loading}
          />
        );
        case 4:
        return (
          <Step4SkillRating
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={formData}
            loading={loading}
          />
        );
        case 5:
        return (
          <Step5Work
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handlePhotoChange={handlePhotoChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            values={formData}
            loading={loading}
          />
        );
        case 6:
        return (
          <Step6JobPreference
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            values={formData}
            loading={loading}
          />
        );
        case 7:
        return (
          <Step7JobReadiness
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            handleCheckboxChange={handleCheckboxChange}
            values={formData}
            loading={loading}
          />
        );
        case 8:
        return (
          <Step8Aggrement
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            values={formData}
            loading={loading}
          />
        );
      case 9:
        return (
          <div className="text-center p-10">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Terima Kasih!
            </h2>
            <p className="text-gray-700">{message.text}</p>
            <Link
              to="/skill-connect"
              className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded"
            >
              Kembali ke Form
            </Link>
          </div>
        );
      default:
        return <div>Formulir Tidak Ditemukan.</div>;
    }
  };

  // Jumlah total step (ubah jika jumlah step bertambah)
  const totalSteps = 8;
  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-2">
          Punya Skill Connect
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {message.text && step !== 3 && (
            <div
              className={`mb-4 text-center p-2 rounded ${
                message.type === "error" ? "bg-red-100 text-red-700" : ""
              }`}
            >
              {message.text}
            </div>
          )}

          {renderStep()}

        </div>
        <div>
          {step < 8 && (
            <>
              <div className="text-center text-gray-500 mt-8">
                <div className="w-full bg-white border border-gray-400 rounded-full h-2.5">
                  <div
                    className="h-[8px] rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="text-blue-600 font-bold">{step}</span> dari{" "}
                {totalSteps}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantFormPage;
