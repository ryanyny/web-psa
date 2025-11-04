import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class ApplicantScore extends Model {
  static associate(models) {
    this.belongsTo(models.Applicant, { foreignKey: 'applicantId' });
    this.belongsTo(models.Skill, { foreignKey: 'skillId' });
  }
}

ApplicantScore.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 3 },
  },
}, {
  sequelize,
  modelName: 'ApplicantScore',
  tableName: 'applicant_scores' // Nama tabel diperbaiki
});

export default ApplicantScore;