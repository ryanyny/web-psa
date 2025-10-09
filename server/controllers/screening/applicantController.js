import Applicant from '../../models/applicantModel.js';
import Educations from '../../models/applicantEducationModel.js';
import WorkExperience from '../../models/applicantWorkExperienceModel.js';
import Skills from '../../models/applicantSkillModel.js';
import ApplicantScore from '../../models/applicantSkillScoreModel.js';
import sequelize from "../config/database.js";

// GET /api/applicants - Mendapatkan semua data applicant
export const index = async (req, res) => {
  try {
    const applicants = await Applicant.findAll({
      // Hanya ambil field tertentu untuk tampilan daftar agar tidak berat
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

// GET /api/applicants/:id - Mendapatkan satu data applicant (versi lengkap)
export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByPk(id, {
      // 'include' untuk mengambil semua data dari tabel lain yang berhubungan
      include: [
        { model: Educations },
        { model: WorkExperience },
        {
          model: ApplicantScore,
          // Sertakan juga detail dari setiap Skill
          include: [{
            model: Skills,
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
  // Mulai transaksi
  const t = await sequelize.transaction();

  try {
    // Asumsi frontend mengirim data dalam format terstruktur
    const {
      // Data utama applicant
      fullName, nickName, email, gender, birthDate, socialMedia, linkedin, phone, province, city, addressByKtp, currentAddress, currentStatus,
      // Data relasional dalam bentuk array
      educations,       // Array of education objects
      workExperiences,  // Array of work experience objects
      scores            // Array of score objects [{ skillId, score }]
    } = req.body;

    const photoPath = req.file ? `/uploads/photos/${req.file.filename}` : null;

    //  Buat data Applicant utama di dalam transaksi
    const newApplicant = await Applicant.create({
      fullName, nickName, email, gender, birthDate, socialMedia, linkedin, phone, province, city, addressByKtp, currentAddress, currentStatus, photo: photoPath
    }, { transaction: t });

    const applicantId = newApplicant.id;

    // Simpan data Education jika ada
    if (educations && educations.length > 0) {
      const educationsData = educations.map(edu => ({ ...edu, applicantId }));
      await Education.bulkCreate(educationsData, { transaction: t });
    }

    // Simpan data WorkExperience jika ada
    if (workExperiences && workExperiences.length > 0) {
      const workExperiencesData = workExperiences.map(work => ({ ...work, applicantId }));
      await WorkExperience.bulkCreate(workExperiencesData, { transaction: t });
    }

    // Simpan data ApplicantScore jika ada
    if (scores && scores.length > 0) {
      const scoresData = scores.map(item => ({ ...item, applicantId }));
      await ApplicantScore.bulkCreate(scoresData, { transaction: t });
    }
    
    // Jika semua berhasil, commit transaksi
    await t.commit();

    res.status(201).json({
      success: true,
      message: 'Data pelamar lengkap berhasil disimpan!',
      data: newApplicant
    });

  } catch (error) {
    // Jika ada error di mana pun, batalkan semua perubahan
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

    // Hapus applicant. Karena kita sudah set 'onDelete: CASCADE' di relasi,
    // semua data Education, WorkExperience, dan ApplicantScore yang terkait akan ikut terhapus otomatis.
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