import { 
  Applicant, 
  Education, 
  WorkExperience, 
  Skill,       
  ApplicantScore,
  sequelize     
} from '../../models/index.js';

// Helper untuk memetakan nama field dari form ke nama skill di database
const skillMappings = [
  { formKey: 'communicationSkill', dbName: 'communicationSkill' },
  { formKey: 'publicSpeakingSkill', dbName: 'publicSpeakingSkill' },
  { formKey: 'criticalThinkingSkill', dbName: 'criticalThinkingSkill' },
  { formKey: 'teamworkSkill', dbName: 'teamworkSkill' },
  { formKey: 'emotionalIntelligenceSkill', dbName: 'emotionalIntelligenceSkill' },
  { formKey: 'adaptabilitySkill', dbName: 'adaptabilitySkill' },
  { formKey: 'creativitySkill', dbName: 'creativitySkill' },
  { formKey: 'timeManagementSkill', dbName: 'timeManagementSkill' },
  { formKey: 'negotiationSkill', dbName: 'negotiationSkill' },
  { formKey: 'MicrosoftOffice', dbName: 'microsoftOfficeSkill' },
  { formKey: 'GoogleWorkspace', dbName: 'googleWorkspaceSKill' },
  { formKey: 'LearningManagementSystem', dbName: 'learningManagementSystemSkill' },
  { formKey: 'SocialMediaManagement', dbName: 'socialMediaManagementSkill' },
  { formKey: 'AIProductivityTools', dbName: 'aIProductivityToolsSkill' },
  { formKey: 'CybersecurityAwareness', dbName: 'cybersecurityAwarenessSkill' },
  { formKey: 'CloudCollaboration', dbName: 'cloudCollaborationSkill' },
  { formKey: 'ProjectManagement', dbName: 'projectManagementSkill' },
  { formKey: 'PeopleManagement', dbName: 'peopleManagementSkill' },
  { formKey: 'StrategicThinking', dbName: 'strategicThinkingSkill' },
  { formKey: 'BusinessDevelopment', dbName: 'businessDevelopmentSkill' },
  { formKey: 'ConflictResolution', dbName: 'conflictResolutionSkill' },
  { formKey: 'DecisionMaking', dbName: 'decisionMakingSkill' },
];

/**
 * @desc    Membuat profil pelamar baru
 * @route   POST /api/applicants
 * @access  Public
 */
const createApplicant = async (req, res) => {
    console.log("--- BODY DITERIMA ---", req.body);
  console.log("--- FILES DITERIMA ---", req.files);
  const t = await sequelize.transaction();

  try {
    let {
      gender,
      certificate,
      currentStatus,
      jobType,
      jobField,
      preferredWorkLocations,
      willingToRelocate,
      ...restOfBody // Sisa field yang tidak perlu diproses manual
    } = req.body;

    // Memberikan fallback '[]' untuk mencegah error jika field tidak dikirim.
    try {
      certificate = JSON.parse(certificate || '[]');
      currentStatus = JSON.parse(currentStatus || '[]');
      jobType = JSON.parse(jobType || '[]');
      jobField = JSON.parse(jobField || '[]');
      preferredWorkLocations = JSON.parse(preferredWorkLocations || '[]');
    } catch (e) {
      // Jika parsing gagal, berarti format dari frontend salah.
      await t.rollback();
      return res.status(400).json({ error: 'Format data array (status, jobType, dll) tidak valid.' });
    }

    // Menyesuaikan nilai ENUM untuk gender agar cocok dengan definisi model.
    if (gender === 'Laki-Laki') {
      gender = 'Laki-laki';
    }

    // Konversi string 'true'/'false' menjadi nilai boolean.
    const isWillingToRelocate = willingToRelocate === 'true';

    const getPublicPath = (file) => file ? `uploads/${file[0].filename}` : null;

    const photoPath = getPublicPath(req.files.photo);
    const cvPath = getPublicPath(req.files.cv);
    const portfolioPath = getPublicPath(req.files.portfolio);
    const identityPath = getPublicPath(req.files.identity);

    if (!photoPath || !cvPath || !identityPath) {
        await t.rollback();
        return res.status(400).json({ error: 'File foto, CV, dan identitas wajib diunggah.' });
    }

    // entri Applicant
    const newApplicant = await Applicant.create({
      ...restOfBody, // Gunakan sisa field dari body
      gender, // Gunakan gender yang sudah diperbaiki
      currentAddress: restOfBody.CurrentAddress,
      photo: photoPath,
    }, { transaction: t });

    const applicantId = newApplicant.id;

    // entri Education
    await Education.create({
      educationLevel: restOfBody.educationLevel,
      latestEducationalInstitution: restOfBody.latestEducationalInstitution,
      major: restOfBody.major,
      certificate, // Gunakan array certificate yang sudah di-parse
      hardskill: restOfBody.hardskill,
      applicantId,
    }, { transaction: t });

    // entri WorkExperience
    await WorkExperience.create({
      experiences: restOfBody.experiences,
      workReadiness: restOfBody.workReadiness,
      currentStatus, // Gunakan array yang sudah di-parse
      jobType,
      jobField,
      preferredWorkLocations,
      willingToRelocate: isWillingToRelocate, // Gunakan boolean yang sudah dikonversi
      cv: cvPath,
      portofolio: portfolioPath,
      identity: identityPath,
      applicantId,
    }, { transaction: t });
    
    // Proses dan simpan skor skill
    const applicantSkills = [];
    for (const mapping of skillMappings) {
        if (req.body[mapping.formKey] !== null && req.body[mapping.formKey] !== undefined) {
            applicantSkills.push({
                name: mapping.dbName,
                score: parseInt(req.body[mapping.formKey], 10),
            });
        }
    }

    if(applicantSkills.length > 0) {
        const skillNames = applicantSkills.map(s => s.name);
        const foundSkills = await Skill.findAll({ where: { name: skillNames } });

        const scoresToCreate = applicantSkills.map(as => {
            const skill = foundSkills.find(fs => fs.name === as.name);
            if (!skill) {
                throw new Error(`Skill dengan nama "${as.name}" tidak ditemukan di database.`);
            }
            return {
                applicantId,
                skillId: skill.id,
                score: as.score,
            };
        });
        
        await ApplicantScore.bulkCreate(scoresToCreate, { transaction: t });
    }
    
    // if (restOfBody.hardskill) {
    //     await Skill.create({
    //         hardskill: restOfBody.hardskill,
    //         name: `Hardskill Set for ${restOfBody.fullName}`,
    //         category: 'Digital Skill'
    //     }, { transaction: t });
    // }

    // Commit transaksi
    await t.commit();

    res.status(201).json({
      message: 'Data pelamar berhasil dibuat!',
      data: { id: applicantId, fullName: restOfBody.fullName },
    });

  } catch (error) {
    await t.rollback();
    console.error("Error saat membuat data pelamar:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: error.message || 'Terjadi kesalahan pada server.' });
  }
};

/**
 * @desc    Mengambil semua data pelamar
 * @route   GET /api/applicants
 * @access  Public
 */
const getAllApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.findAll({
            // Sertakan data dari model lain yang berelasi
            include: [
                { model: Education },
                { model: WorkExperience },
                { 
                    model: ApplicantScore,
                    include: [{ model: Skill, attributes: ['name', 'category'] }] // Tampilkan nama & kategori skill
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(applicants);
    } catch (error) {
        console.error("Error saat mengambil data pelamar:", error);
        res.status(500).json({ error: 'Gagal mengambil data dari server.' });
    }
};

/**
 * @desc    Mengambil data pelamar tunggal berdasarkan ID
 * @route   GET /api/applicants/:id
 * @access  Public
 */
const getApplicantById = async (req, res) => {
    try {
        const applicant = await Applicant.findByPk(req.params.id, {
            // Sertakan juga semua data relasinya
             include: [
                { model: Education },
                { model: WorkExperience },
                { 
                    model: ApplicantScore,
                    include: [{ model: Skill, attributes: ['name', 'category'] }]
                }
            ]
        });

        if (!applicant) {
            return res.status(404).json({ error: 'Data pelamar tidak ditemukan.' });
        }

        res.status(200).json(applicant);
    } catch (error) {
        console.error(`Error saat mengambil data pelamar ID ${req.params.id}:`, error);
        res.status(500).json({ error: 'Gagal mengambil data dari server.' });
    }
};


export default {
  createApplicant,
  getAllApplicants,
  getApplicantById,
};