import { 
  Applicant, 
  Education, 
  WorkExperience, 
  Skill,       
  ApplicantScore,
  sequelize    
} from '../../models/index.js';

// GET /api/applicants - Mendapatkan semua data applicant
export const index = async (req, res) => {
  try {
    const applicants = await Applicant.findAll({
      attributes: ['id', 'photo', 'fullName', 'email', 'phone', 'currentStatus'],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'Data semua pelamar berhasil diambil!',
      data: applicants
    });
  } catch (error) {
    console.error("Index Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET /api/applicants/:id - Mendapatkan satu data applicant
export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByPk(id, {
      include: [
        { model: Education },      
        { model: WorkExperience },
        {
          model: ApplicantScore,
          include: [{
            model: Skill,
            attributes: ['name', 'category']
          }]
        }
      ]
    });

    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Data pelamar tidak ditemukan!' });
    }

    res.status(200).json({
      success: true,
      message: 'Detail data pelamar berhasil diambil!',
      data: applicant
    });
  } catch (error) {
    console.error("Show Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// POST /api/applicants - Menyimpan data applicant baru ke banyak tabel
export const store = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      fullName, nickName, email, gender, birthDate, socialMedia, linkedin, phone, province, city, addressByKtp, currentAddress, currentStatus,
      educations,
      workExperiences,
      scores
    } = req.body;

    const photoPath = req.file ? `/uploads/photos/${req.file.filename}` : null;

    const newApplicant = await Applicant.create({
      fullName, nickName, email, gender, birthDate, socialMedia, linkedin, phone, province, city, addressByKtp, currentAddress, currentStatus, photo: photoPath
    }, { transaction: t });

    const applicantId = newApplicant.id;

    if (educations && educations.length > 0) {
      const educationsData = educations.map(edu => ({ ...edu, applicantId }));
      await Education.bulkCreate(educationsData, { transaction: t });
    }

    if (workExperiences && workExperiences.length > 0) {
      const workExperiencesData = workExperiences.map(work => ({ ...work, applicantId }));
      await WorkExperience.bulkCreate(workExperiencesData, { transaction: t });
    }

    if (scores && scores.length > 0) {
      const scoresData = scores.map(item => ({ ...item, applicantId }));
      await ApplicantScore.bulkCreate(scoresData, { transaction: t });
    }
    
    await t.commit();

    res.status(201).json({
      success: true,
      message: 'Data pelamar lengkap berhasil disimpan!',
      data: newApplicant
    });

  } catch (error) {
    await t.rollback();
    console.error("Store Error:", error);
    res.status(500).json({ success: false, message: 'Gagal menyimpan data.', error: error.message });
  }
};

// DELETE /api/applicants/:id - Menghapus data applicant
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByPk(id);

    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Data pelamar tidak ditemukan!' });
    }
    
    await applicant.destroy();

    res.status(200).json({
      success: true,
      message: 'Data pelamar berhasil dihapus!'
    });
  } catch (error) {
    console.error("Destroy Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};