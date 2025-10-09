import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class Skill extends Model { 
  static associate(models) {
    this.hasMany(models.ApplicantScore, { foreignKey: 'skillId' });
  }
}

Skill.init({
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
  modelName: 'Skill',
  tableName: 'skills',
  timestamps: false
});

export default Skill;