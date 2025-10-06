import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"
import Program from "./programModel.js"

class Participant extends Model {}

Participant.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
        },
        province: {
            type: DataTypes.STRING(50)
        },
        city: {
            type: DataTypes.STRING(50),
        },
        address: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: "Participant",
    },
)

Program.hasMany(Participant, { foreignKey: "programId", as: "participants", onDelete: "CASCADE" })
Participant.belongsTo(Program, { foreignKey: "programId", as: "program" })

export default Participant