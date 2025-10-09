import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class WorkExperience extends Model {
  static associate(models) {
    // Setiap pengalaman kerja adalah milik satu Applicant
    this.belongsTo(models.Applicant, {
      foreignKey: "applicantId",
    });
  }
}

WorkExperience.init(
  {
    currentStatus: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    workingExperience: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hardSkill: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "works",
    timestamps: true,
  }
);

export default WorkExperience;
