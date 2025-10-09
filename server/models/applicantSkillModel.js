import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import ApplicantSkillScore from './applicantSkillScoreModel.js';

class Skills extends Model {}

Skills.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.ENUM('Soft Skill (Behavioral)', 'Digital Skill', 'Managerial/Leadership Skill'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Skills',
  timestamps: false
});

Skills.hasMany(ApplicantSkillScore, {foreignKey: 'skillId'});

export default Skills;