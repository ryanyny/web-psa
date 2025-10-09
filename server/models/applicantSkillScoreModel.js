import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js"
import Applicant from "./applicantModel.js";
import Skill from "./applicantSkillModel.js";

class ApplicantScore extends Model {}

ApplicantScore.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 3,
      },
    },
  },
  {
    sequelize,
    modelName: "ApplicantSkillScore",
  }
);

// Setiap baris nilai merujuk ke satu skill pada Applicant
ApplicantSkillScore.belongsTo(Applicant, {foreignKey: "applicantId",});
// Setiap baris nilai merujuk ke satu Skill
ApplicantSkillScore.belongsTo(Skill, {foreignKey: "skillId",});

export default ApplicantScore;
