import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class Program extends Model {}

Program.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        eventDate: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM("aktif", "tidak aktif"),
            defaultValue: "aktif",
        },
    },
    {
        sequelize,
        modelName: "Program",
    },
)

export default Program