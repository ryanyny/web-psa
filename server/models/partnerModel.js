import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class Partner extends Model {}

Partner.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        address: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM("aktif", "tidak aktif"),
            defaultValue: "aktif",
        },
    },
    {
        sequelize,
        modelName: "Partner",
    },
)

export default Partner