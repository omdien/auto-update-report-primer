import { Sequelize } from "sequelize";
import  { db_mutu }  from "../../config/database.js";

const { DataTypes } = Sequelize;

const Tb_perizinan = db_mutu.define(
    "tb_perizinan",
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        kd_izin: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        ur_izin: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ur_izin_singkat: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        kd_pusat: {
            type: DataTypes.STRING(2),
            allowNull: true
        }
    }, {
    Sequelize,
    tableName: 'tb_perizinan',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id" },
            ]
        },
    ]
});

export default Tb_perizinan;

