import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Applicant extends Model {
  static associate(models) {
    // Satu Applicant bisa punya banyak data di bawah ini
    this.hasMany(models.Education, { foreignKey: 'applicantId', onDelete: 'CASCADE' });
    this.hasMany(models.WorkExperience, { foreignKey: 'applicantId', onDelete: 'CASCADE' });
    this.hasMany(models.ApplicantScore, { foreignKey: 'applicantId', onDelete: 'CASCADE' });
  }
}

Applicant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  gender: {
    type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: '1970-01-01'
  },
  socialMedia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addressByKtp: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  currentAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Applicant',
  tableName: 'applicants',
});

export default Applicant;