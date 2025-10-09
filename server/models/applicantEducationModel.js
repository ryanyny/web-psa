import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js"
import Applicant from './applicantModel.js';


class Educations extends Model {}

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
}, {
  sequelize,
  modelName: 'Educations',
  tableName: 'educations',
  timestamps: true
});

// Setiap Education merujuk ke satu applicant
Educations.belongsTo(Applicant, {foreignKey: 'applicantId'});

export default Educations;