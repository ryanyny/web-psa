import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class WorkExperience extends Model {
  static associate(models) {
    this.belongsTo(models.Applicant, { foreignKey: 'applicantId' });
  }
}

WorkExperience.init({
  currentStatus: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  experiences: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  portofolio :{
    type: DataTypes.STRING,
    allowNull: false
  },
  jobType: {
    type: DataTypes.JSON,
    allowNull: false
  },
  jobField: {
    type: DataTypes.JSON,
    allowNull: false
  },
  preferredWorkLocations: {
    type: DataTypes.JSON,
    allowNull: false
  },
  workReadiness: {
    type: DataTypes.ENUM('Segera', 'Dalam 1 Bulan', 'Dalam 3 Bulan'),
    allowNull: false
  },
  willingToRelocate: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  identity:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'WorkExperience',
  tableName: 'work_experiences',
});

export default WorkExperience;