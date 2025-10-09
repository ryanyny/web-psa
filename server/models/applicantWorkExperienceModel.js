import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";

class WorkExperience extends Model {
  static associate(models) {
    this.belongsTo(models.Applicant, { foreignKey: 'applicantId' });
  }
}

WorkExperience.init({
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'WorkExperience',
  tableName: 'work_experiences',
});

export default WorkExperience;