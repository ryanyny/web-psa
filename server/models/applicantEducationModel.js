import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Education extends Model {
  static associate(models) {
    this.belongsTo(models.Applicant, { foreignKey: 'applicantId' });
  }
}

Education.init({
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
    type: DataTypes.JSON,
    allowNull: false
  },
    hardskill: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Education',
  tableName: 'educations',
});

export default Education;