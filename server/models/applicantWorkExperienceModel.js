import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Applicant from "./applicantModel.js";

class WorkExperience extends Model {}

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

WorkExperience.belongsTo(Applicant, {foreignKey: 'applicantId'});

export default WorkExperience;
