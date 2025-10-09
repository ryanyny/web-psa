import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';

class ApplicantScore extends Model {
  static associate(models) {
    // Setiap baris nilai milik satu Applicant
    this.belongsTo(models.Applicant, { 
      foreignKey: 'applicantId' 
    });
    // Setiap baris nilai merujuk ke satu Skill
    this.belongsTo(models.Skill, { 
      foreignKey: 'skillId' 
    });
  }
}

ApplicantScore.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 3
    }
  }
}, {
  sequelize,
  modelName: 'ApplicantScore',
});

export default ApplicantScore;