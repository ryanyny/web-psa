import User from '../../models/applicantModel.js';

const emailController = {
  // Check if email exists in database
  checkEmail: async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validation
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Format email tidak valid'
        });
      }

      // Check if email exists in database using Sequelize
      const existingUser = await User.findOne({
        where: { 
          email: email.toLowerCase().trim() 
        }
      });

      // Debug: log untuk cek hasil query
      // console.log('🔍 Checking email:', email);
      // console.log('📊 Found user:', existingUser ? 'YES' : 'NO');

      // Jika email SUDAH ADA di database
      if (existingUser) {
        return res.json({
          success: true,
          exists: true,  // ← Email SUDAH terdaftar
          message: 'Email sudah terdaftar. Silakan gunakan email lain.'
        });
      }

      // Jika email BELUM ADA di database
      return res.json({
        success: true,
        exists: false,  // ← Email TERSEDIA
        message: 'Email tersedia'
      });

    } catch (error) {
      console.error('❌ Error checking email:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server'
      });
    }
  },
};

export default emailController;