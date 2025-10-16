import sequelize from '../config/database.js';
import Skill from '../models/applicantSkillModel.js';
import ApplicantScore from '../models/applicantSkillScoreModel.js'; // <-- SESUAIKAN NAMA FILE & MODEL
import { skillsData } from './data.js';

const seedSkills = async () => {
    try {
        console.log('Memulai proses seeding data skills...');

        // Hapus data di tabel 'anak' dulu
        await ApplicantScore.destroy({ where: {} });
        console.log('Data applicant_scores lama berhasil dihapus.');

        // Hapus data di tabel 'induk' menggunakan DELETE biasa
        await Skill.destroy({ where: {} });
        console.log('Data skills lama berhasil dihapus.');
        
        // Seeding data baru
        await Skill.bulkCreate(skillsData);
        console.log('✅ Seeding data skills berhasil!');

    } catch (error) {
        console.error('❌ Gagal melakukan seeding data skills:', error);
        process.exit(1); 
    }
};

const runSeeder = async () => {
    await seedSkills();
    console.log('Semua proses seeding selesai.');
    await sequelize.close();
};

runSeeder();