import sequelize from '../config/database.js';
import Skill from '../models/applicantSkillModel.js';
import ApplicantScore from '../models/applicantSkillScoreModel.js'; // <-- SESUAIKAN NAMA FILE & MODEL
import User from '../models/userModel.js';
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

const seedUsers = async () => {
    try {
        console.log('Memulai proses seeding data users...');

        // Hapus data users lama
        // Pastikan kolom role mempunyai nilai 'recruiter' di enum (jika menggunakan enum di DB)
        try {
            console.log('Memastikan kolom role memiliki opsi recruiter...');
            await sequelize.query("ALTER TABLE `Users` MODIFY `role` ENUM('user','admin','recruiter') NOT NULL DEFAULT 'user';");
            console.log('Kolom role berhasil diperbarui untuk menyertakan recruiter (jika diperlukan).');
        } catch (alterErr) {
            console.warn('Gagal mengubah struktur kolom role (mungkin sudah sesuai). Error:', alterErr.message || alterErr);
        }

        await User.destroy({ where: {} });
        console.log('Data users lama berhasil dihapus.');

        // Buat user recruiter contoh
        await User.create({
            name: 'recruiter',
            email: 'recruiter@example.com',
            gender: 'laki-laki',
            role: 'recruiter',
            password: 'Recruiter123!'
        });

        // Buat user biasa contoh
        // await User.create({
        //     name: 'testuser',
        //     email: 'user@example.com',
        //     role: 'user',
        //     password: 'User123!'
        // });

        console.log('✅ Seeding data users berhasil!');
    } catch (error) {
        console.error('❌ Gagal melakukan seeding data users:', error);
        process.exit(1);
    }
}

const runSeeder = async () => {
    // await seedSkills();
    await seedUsers();
    console.log('Semua proses seeding selesai.');
    await sequelize.close();
};

runSeeder();