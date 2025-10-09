import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class Educations extends Model {
  static associate(models) {
    // Setiap baris Education adalah milik satu Applicant
    this.belongsTo(models.Applicant, {
      foreignKey: 'applicantId'
    });
  }
}

Educations.init({
  educationLevel: {
    type: DataTypes.ENUM('SMK/SMA/MA/Setara', 'Diploma', 'Sarjana', 'Magister'),
    allowNull: false
  },
  latestEducationalInstitution: {
    type: DataTypes.STRING,
    allowNull: false
  },
  major: {
    type: DataTypes.STRING,
    allowNull: false
  },
  certificate: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // Kolom 'applicantId' akan otomatis dikelola oleh Sequelize karena ada foreignKey
}, {
  sequelize,
  modelName: 'Educations',
  tableName: 'educations',
  timestamps: true
});

export default Educations;