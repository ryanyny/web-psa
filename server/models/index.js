import sequelize from '../config/database.js';

// Mengimpor setiap model dari filenya masing-masing
import Applicant from './applicantModel.js';
import Education from './applicantEducationModel.js';
import WorkExperience from './applicantWorkExperienceModel.js';
import Skill from './applicantSkillModel.js';
import ApplicantScore from './applicantSkillScoreModel.js';

/**
 * Membuat sebuah objek untuk menampung semua model.
 * Ini memudahkan kita untuk meneruskan semua model ke dalam fungsi `associate`.
 */
const models = {
  Applicant,
  Education,
  WorkExperience,
  Skill,
  ApplicantScore
};

/**
 * Menjalankan fungsi `associate` untuk setiap model.
 * * Looping ini akan berjalan setelah semua model di atas selesai diimpor
 * dan didefinisikan. Ini adalah kunci untuk menghindari error Circular Dependency.
 */
for (const modelName in models) {
  // Memeriksa apakah model memiliki metode 'associate'
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
}

// Mengekspor instance sequelize dan semua model secara individual
export {
  sequelize,
  Applicant,
  Education,
  WorkExperience,
  Skill,
  ApplicantScore
};